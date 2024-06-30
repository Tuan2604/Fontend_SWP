import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Button, Typography } from "antd";
import axios from "axios";
import "./UserManagement.css";

const { Title } = Typography;

const UserManagementPage = ({ isLoggedIn, setShowHeader }) => {
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      // Handle unauthorized access if needed
      console.log("Unauthorized access attempted.");
      return;
    }
    handleFetchData();
    setShowHeader(false); // Hide header when UserManagementPage is mounted
    return () => {
      setShowHeader(true); // Show header when leaving UserManagementPage
    };
  }, [isLoggedIn, reload, setShowHeader]);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        "/user-management"
      );
      if (response.status === 200) {
        setData(response.data); // Assuming response.data is an array of users
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching user data");
    }
  };

  const handleUpdateUser = async () => {
    // Implement your update user logic here
  };

  const handleDeleteUser = async (id) => {
    // Implement your delete user logic here
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      width: "30%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "Active" ? "green" : "volcano";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setSelectedItem(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </a>
          <a onClick={() => handleDeleteUser(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-management-container">
      <Title level={3}>User Management</Title>
      <Table columns={columns} dataSource={data} rowKey="id" />
      {/* ModalEdit component goes here */}
    </div>
  );
};

export default UserManagementPage;
