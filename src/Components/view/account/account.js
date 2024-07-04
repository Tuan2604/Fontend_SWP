import React, { useState } from "react";
import { Typography, Button, Form, Input, Avatar } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons"; // Import UserOutlined
import { useNavigate } from "react-router-dom";
import "./account.css";

const { Title } = Typography;

const Account = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email"),
    fullname: localStorage.getItem("fullname"),
    phoneNumber: localStorage.getItem("phoneNumber"),
  });

  const handleLogout = () => {
    // Clear localStorage and navigate to login
    localStorage.clear();
    navigate("/login");
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleFormChange = (changedFields) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...changedFields,
    }));
  };

  const onFinish = () => {
    // Handle save/update logic here
    console.log("Updated Form Data:", formData);
    setEditMode(false);
    // You can add logic here to update server with formData if needed
  };

  return (
    <div className="account-container">
      <Avatar
        size={64}
        style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
        icon={<UserOutlined />}
      />{" "}
      {/* Use UserOutlined here */}
      <Title level={2}>Account Information</Title>
      <Form
        layout="vertical"
        initialValues={formData}
        onValuesChange={handleFormChange}
        onFinish={onFinish}
      >
        <Form.Item name="email" label="Email">
          <Input disabled={!editMode} />
        </Form.Item>
        <Form.Item name="fullname" label="Full Name">
          <Input disabled={!editMode} />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Phone Number">
          <Input disabled={!editMode} />
        </Form.Item>
        {editMode && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}
      </Form>
      {!editMode && (
        <Button type="primary" onClick={handleEditMode}>
          <EditOutlined /> Edit
        </Button>
      )}
    </div>
  );
};

export default Account;
