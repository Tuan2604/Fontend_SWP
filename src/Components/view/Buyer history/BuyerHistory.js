import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import axiosInstance from "../../../authService";
import { useAuth } from "../../Hook/useAuth";
import "./PostApplyDetails.css";

const PostApplyDetailsHistory = () => {
  const { postId: postIdFromUrl } = useParams(); // Get the postId from URL
  const [postApplies, setPostApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(postIdFromUrl || "");
  const { userInformation } = useAuth();

  const fetchPostIdAndApplies = async () => {
    try {
      let id = postIdFromUrl;

      // If no postId is provided in the URL, fetch the pending post
      if (!postIdFromUrl) {
        const postResponse = await axiosInstance.get(
          `https://localhost:7071/api/product-post/me?status=Closed`
        );
        id = postResponse.data[0]?.id;
        setPostId(id);
      }

      if (id) {
        const appliesResponse = await axiosInstance.get(
          `https://localhost:7071/api/post-apply/${id}?pageIndex=1`
        );
        console.log("API Response:", appliesResponse.data);
        setPostApplies(appliesResponse.data);
        setLoading(false);
      } else {
        setError("No pending post found.");
        setLoading(false);
      }
    } catch (error) {
      handleFetchError(error);
    }
  };

  useEffect(() => {
    fetchPostIdAndApplies();
  }, [postIdFromUrl]);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      handleTokenRefresh();
    } else {
      console.error("API Error:", error.message);
      setError(`Failed to fetch post applies: ${error.message}`);
      setLoading(false);
    }
  };

  const handleTokenRefresh = async () => {
    try {
      await refreshAccessToken();
      fetchPostIdAndApplies();
    } catch (refreshError) {
      console.error("Error refreshing token:", refreshError);
      setError("Failed to refresh token. Please log in again.");
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axiosInstance.post("/refresh-token", {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      throw new Error("Error refreshing token");
    }
  };

  if (loading) {
    return <div className="post-apply-details">Loading...</div>;
  }

  if (error) {
    return <div className="post-apply-details">{error}</div>;
  }

  if (postApplies.length === 0) {
    return <div className="post-apply-details">No post applies found.</div>;
  }

  return (
    <div className="post-apply-details">
      <h2>Post Applies Details</h2>
      <div className="post-apply-list">
        {postApplies.map((apply) => (
          <div key={apply.id} className="apply-item">
            {apply.buyerInfo?.email !== userInformation?.email && (
              <>
                {apply.message && (
                  <p>
                    <strong>Message:</strong> {apply.message}
                  </p>
                )}
                {apply.buyerInfo && (
                  <>
                    <p>
                      <strong>Buyer Name:</strong> {apply.buyerInfo.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {apply.buyerInfo.email}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {apply.buyerInfo.phoneNumber}
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostApplyDetailsHistory;
