import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { useAuth } from "../../../Hook/useAuth";
import ModLayout from "../../../layout/ModLayout";

const ProductPostList = () => {
  const [posts, setPosts] = useState([]);
  const [showHeader, setShowHeader] = useState(false); // Initially hide header
  const { refreshAccessToken } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setShowHeader(false); // Hide header before fetching data
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://localhost:7071/api/product-post/all?status=Waiting",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPosts(response.data); // Assuming response.data is an array of posts with title and description
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            await refreshAccessToken();
            // Retry fetching posts after refreshing token
            const newAccessToken = localStorage.getItem("accessToken");
            const retryResponse = await axios.get(
              "https://localhost:7071/api/product-post/all?status=Waiting",
              {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            setPosts(retryResponse.data);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            message.error("Failed to refresh token. Please log in again.");
            // Redirect to login or handle logout
          }
        } else {
          console.error("Error fetching posts:", error);
          message.error(
            error.response?.data?.message ||
              "Failed to fetch posts. Please try again later."
          );
        }
      } finally {
        setShowHeader(true); // Show header after fetching data
      }
    };

    fetchPosts();

    // Cleanup function
    return () => {
      setShowHeader(false); // Ensure header is hidden on component unmount
    };
  }, [refreshAccessToken]);

  const handleApprove = async (postId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `https://localhost:7071/api/product-post/approve/${postId}`,
        "Open",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      message.success("Post approved successfully!");
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error approving post:", error);
      message.error("Failed to approve post. Please try again later.");
    }
  };

  const handleReject = async (postId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `https://localhost:7071/api/product-post/approve/${postId}`,
        "Closed",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      message.success("Post rejected successfully!");
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error rejecting post:", error);
      message.error("Failed to reject post. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title", // Assuming title is the field name
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description", // Assuming description is the field name
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleApprove(record.id)}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button type="danger" onClick={() => handleReject(record.id)}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ModLayout>
      {showHeader && <h1>Product Post List</h1>}{" "}
      {/* Conditionally render the header */}
      <Table dataSource={posts} columns={columns} rowKey="id" />
    </ModLayout>
  );
};

export default ProductPostList;
