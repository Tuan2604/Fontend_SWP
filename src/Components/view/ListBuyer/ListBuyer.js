import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Hook/useAuth";
import axiosInstance from "../../../authService"; // assuming you have axios instance set up

const PostApplyDetails = () => {
  const [postApplies, setPostApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setIsLogin } = useAuth();
  const postId = "aa19d521-84a0-4939-87ac-9056f6577e1d"; // Setting postId directly

  useEffect(() => {
    const fetchPostApplies = async () => {
      try {
        const response = await axiosInstance.get(
          `/post-apply/${postId}?pageIndex=2`
        );
        console.log("API Response:", response.data); // Log the API response
        setPostApplies(response.data); // Assuming response.data is an array of post applies
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            await refreshAccessToken();
            // Retry the original request after refreshing token
            const response = await axiosInstance.get(
              `/post-apply/${postId}?pageIndex=2`
            );
            console.log("API Response after refresh:", response.data); // Log the API response after refreshing token
            setPostApplies(response.data); // Assuming response.data is an array of post applies
            setLoading(false);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            setError("Failed to refresh token. Please log in again.");
          }
        } else {
          console.error("API Error:", error.message); // Log the error message
          setError("Failed to fetch post applies. Please try again later.");
        }
      }
    };

    fetchPostApplies();
  }, [postId]);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axiosInstance.post(
        "/refresh-token",
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      return accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error.message);
      throw new Error("Error refreshing token");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (postApplies.length === 0) {
    return <div>No post applies found.</div>;
  }

  return (
    <div>
      {postApplies.map((apply) => (
        <div key={apply.id}>
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
                <strong>Phone Number:</strong> {apply.buyerInfo.phoneNumber}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostApplyDetails;
