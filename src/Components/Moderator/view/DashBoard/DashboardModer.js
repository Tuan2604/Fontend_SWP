import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import axios from "axios";
import { useAuth } from "../../../Hook/useAuth";
import ModLayout from "../../../layout/ModLayout";

const Dashboard2 = () => {
  const [postModeData, setPostModeData] = useState([]);
  const [userPurchaseData, setUserPurchaseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshAccessToken } = useAuth();

  const fetchPostModeData = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://localhost:7071/api/statistical/post-mode?from=${startDate}&to=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPostModeData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          const newAccessToken = localStorage.getItem("accessToken");
          const retryResponse = await axios.get(
            `https://localhost:7071/api/statistical/post-mode?from=${startDate}&to=${endDate}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          setPostModeData(retryResponse.data);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          message.error("Failed to refresh token. Please log in again.");
        }
      } else {
        console.error("Error fetching post mode data:", error);
        setError(error);
        message.error(
          "Failed to fetch post mode data. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPurchaseData = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://localhost:7071/api/statistical/user-purchase?from=${startDate}&to=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserPurchaseData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          const newAccessToken = localStorage.getItem("accessToken");
          const retryResponse = await axios.get(
            `https://localhost:7071/api/statistical/user-purchase?from=${startDate}&to=${endDate}`,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          setUserPurchaseData(retryResponse.data);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          message.error("Failed to refresh token. Please log in again.");
        }
      } else {
        console.error("Error fetching user purchase data:", error);
        setError(error);
        message.error(
          "Failed to fetch user purchase data. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startDate = "2023/01/01";
    const endDate = "2023/12/31";
    fetchPostModeData(startDate, endDate);
    fetchUserPurchaseData(startDate, endDate);
  }, [refreshAccessToken]);

  const postModeColumns = [
    {
      title: "Post Mode Type",
      dataIndex: "postModeType",
      key: "postModeType",
    },
    {
      title: "Total Sold",
      dataIndex: "totalSold",
      key: "totalSold",
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
  ];

  const userPurchaseColumns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ModLayout showHeader={true}>
      <div className="dashboard">
        <h1>Dashboard Mod</h1>
        <h2>Post Mode</h2>
        <Table
          dataSource={postModeData}
          columns={postModeColumns}
          rowKey="id"
        />

        <h2>User Purchases</h2>
        <Table
          dataSource={userPurchaseData}
          columns={userPurchaseColumns}
          rowKey="id"
        />
      </div>
    </ModLayout>
  );
};

export default Dashboard2;
