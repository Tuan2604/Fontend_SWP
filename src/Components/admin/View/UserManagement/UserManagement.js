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
  Select,
  message, // Import message from antd for notifications
} from "antd";
import axiosInstance from "../../../../authService";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";
import AdminLayout from "../../../layout/header/AdminLayout";
import { useAuth } from "../../../Hook/useAuth";

const { Title } = Typography;
const { Option } = Select;

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
      const response = await axiosInstance.get(
        "https://localhost:7071/api/user-management"
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
      email: record.email,
      phoneNumber: record.phoneNumber,
      role: record.role,
    });
  };

  const handleSaveUser = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = {
        id: selectedItem.id,
        fullname: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: values.role,
      };
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axiosInstance.put(
        "https://localhost:7071/api/user-management/edit-user",
        updatedUser,
        { headers }
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        setReload(!reload); // Trigger reload of user data
        message.success("User updated successfully.");
      } else {
        console.error(
          "Failed to update user. Server responded with status:",
          response.status
        );
        message.error("Failed to update user. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.status);
        message.error(
          "An error occurred while updating user. Please try again later."
        );
      } else {
        message.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axiosInstance.delete(
        `https://localhost:7071/api/user-management/delete-user/${id}`,
        { headers }
      );
      if (response.status === 200) {
        setReload(!reload); // Trigger reload of user data
        message.success("User deleted successfully.");
      } else {
        console.error("Failed to delete user");
        message.error("Failed to delete user. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("An error occurred while deleting user.");
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
              name="email"
              label="Email Address"
              rules={[{ required: true, message: "Please enter email" }]}
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
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select>
                <Option value="Admin">Admin</Option>
                <Option value="Moderator">Moderator</Option>
                <Option value="User">User</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
