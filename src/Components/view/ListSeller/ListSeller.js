import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import axiosInstance from "../../../authService";
import { useAuth } from "../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import "./ListSeller.css";

const SellerPosts = () => {
  const [sellerPosts, setSellerPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInformation } = useAuth();
  const navigate = useNavigate();

  const fetchSellerPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7071/api/product-post/me?status=Pending`
      );
      setSellerPosts(response.data);
      setLoading(false);
    } catch (error) {
      handleFetchError(error);
    }
  };

  useEffect(() => {
    fetchSellerPosts();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      handleTokenRefresh();
    } else {
      console.error("API Error:", error.message);
      setError(`Failed to fetch seller posts: ${error.message}`);
      setLoading(false);
    }
  };

  const handleTokenRefresh = async () => {
    try {
      await refreshAccessToken();
      fetchSellerPosts();
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

  const handleViewBuyerDetails = (postId) => {
    navigate(`/buyer-details/${postId}`);
  };

  if (loading) {
    return <div className="seller-posts">Loading...</div>;
  }

  if (error) {
    return <div className="seller-posts">{error}</div>;
  }

  return (
    <div className="seller-posts">
      <Card title="List Seller" className="seller-posts-card">
        {sellerPosts.length > 0 ? (
          <div className="post-list">
            {sellerPosts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="item-header">
                  <h2>{post.title}</h2>
                  {post.imageUrls && post.imageUrls.length > 0 && (
                    <img
                      src={post.imageUrls[0]}
                      alt={post.title}
                      className="item-image"
                    />
                  )}
                </div>
                <div className="post-details">
                  <p>Description: {post.description}</p>
                  <p>Price: {post.price}</p>
                  <p>Category: {post.category}</p>
                  <p>Post Mode: {post.postMode}</p>
                  <p>Campus: {post.campus}</p>
                  <p>
                    Created Date:{" "}
                    {new Date(post.createdDate).toLocaleDateString()}
                  </p>
                  <p>
                    Expired Date:{" "}
                    {new Date(post.expiredDate).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  type="primary"
                  onClick={() => handleViewBuyerDetails(post.id)}
                >
                  View Buyer Details
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No pending posts found.</p>
        )}
      </Card>
    </div>
  );
};

export default SellerPosts;