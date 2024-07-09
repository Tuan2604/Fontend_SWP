import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Tag,
  Typography,
  Modal,
  Form,
  Input,
  Button,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";
import AdminLayout from "../../../layout/header/AdminLayout";
import { useAuth } from "../../../Hook/useAuth";

const { Title } = Typography;

const UserManagementPage = ({ setShowHeader, setIsLoggedIn }) => {
  const { isLogin, setIsLogin, userInformation } = useAuth();
  const navigate = useNavigate();

  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login"); // Redirect to admin login if not logged in
      return;
    }
    handleFetchData();
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [isLogin, reload, setShowHeader, navigate]);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7071/api/user-management",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Failed to fetch data");
        message.error("Failed to fetch user data. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while fetching user data.");
    }
  };

  const handleEditUser = (record) => {
    setSelectedItem(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      fullname: record.fullname,
      phoneNumber: record.phoneNumber,
    });
  };

  const handleSaveUser = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = {
        id: selectedItem.id,
        fullname: values.fullname,
        phoneNumber: values.phoneNumber,
      };

      await axios.put(
        "https://localhost:7071/api/user-management/edit-user",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setIsModalOpen(false);
      setReload(!reload); // Trigger reload of user data
      message.success("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          await handleSaveUser(); // Retry original request
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          message.error("Failed to refresh token. Please log in again.");
          navigate("/login");
        }
      } else {
        message.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(
        `https://localhost:7071/api/user-management/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setReload(!reload); // Trigger reload of user data
      message.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response && error.response.status === 401) {
        try {
          await refreshAccessToken();
          await handleDeleteUser(id); // Retry original request
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          message.error("Failed to refresh token. Please log in again.");
          navigate("/login");
        }
      } else {
        message.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        "https://localhost:7071/api/refresh-token",
        { refreshToken }
      );

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      throw new Error("Error refreshing token");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowHeader(true);
    setIsLogin(false);
    localStorage.removeItem("accessToken");
    navigate("/login", { replace: true });
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
          <a onClick={() => handleEditUser(record)}>Edit</a>
          <a onClick={() => handleDeleteUser(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="user-management-container">
        <Title level={3}>User Management</Title>
        <Table columns={columns} dataSource={data} rowKey="id" />

        <Modal
          title="Edit User"
          visible={isModalOpen}
          onOk={handleSaveUser}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="fullname"
              label="Full Name"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
