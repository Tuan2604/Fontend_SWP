import React, { useState, useEffect } from "react";
import { Modal, Button, Checkbox, message } from "antd";
import axiosInstance from "../../../authService";
import { useAuth } from "../../Hook/useAuth";
import "./PostApplyDetails.css";

const PostApplyDetails = () => {
  const [postApplies, setPostApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState("");
  const { userInformation } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchPostIdAndApplies = async () => {
    try {
      const postResponse = await axiosInstance.get(
        `https://localhost:7071/api/product-post/me?status=Pending`
      );
      const id = postResponse.data[0]?.id;

      setPostId(id);

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
  }, []);

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

  const handleClosePost = async () => {
    try {
      const selectedIdsString = selectedIds.join(",");
      const response = await axiosInstance.put(
        `https://localhost:7071/api/product-post/close/${postId}`,
        selectedIdsString,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Post closed successfully.");
        setError("The post has been closed successfully.");
        setPostApplies([]);
      } else {
        throw new Error("Failed to close the post.");
      }
    } catch (error) {
      console.error("Failed to close the post:", error.message);
      setError("Failed to close the post.");
    }
  };

  const handleCheckboxChange = (id) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await handleClosePost();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
            <Checkbox
              onChange={() => handleCheckboxChange(apply.id)}
              checked={selectedIds.includes(apply.id)}
            />
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
      <Button onClick={showModal} className="close-post-button">
        Close Post
      </Button>
      <Modal
        title="Confirm Close Post"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to close this post?</p>
      </Modal>
    </div>
  );
};

export default PostApplyDetails;
