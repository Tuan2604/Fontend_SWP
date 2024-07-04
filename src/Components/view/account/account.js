import React, { useState } from "react";
import { Typography, Button, Form, Input, Avatar, Row, Col } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./account.css";

const { Title, Text } = Typography;

const Account = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email"),
    fullname: localStorage.getItem("fullname"),
    phoneNumber: localStorage.getItem("phoneNumber"),
  });

  const handleLogout = () => {
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
    console.log("Updated Form Data:", formData);
    setEditMode(false);
  };

  return (
    <div className="account-container">
      <Row gutter={16} style={{ width: "100%" }}>
        <Col span={8} className="account-sidebar">
          <Avatar
            size={100}
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            icon={<UserOutlined />}
          />
          <Title level={3}>{formData.fullname}</Title>
          <Text>Tham gia: 20 August 2022</Text>
          <div className="account-badges">
            <span className="badge">A</span>
            <span className="badge">2</span>
          </div>
        </Col>
        <Col span={16} className="account-details">
          <Title level={4}>Thông tin tài khoản {formData.fullname}</Title>
          <Form
            layout="vertical"
            initialValues={formData}
            onValuesChange={handleFormChange}
            onFinish={onFinish}
          >
            <Form.Item name="fullname" label="Họ tên:">
              <Input disabled={!editMode} />
            </Form.Item>
            <Form.Item name="email" label="Email:">
              <Input disabled={!editMode} />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Số điện thoại:">
              <Input disabled={!editMode} />
            </Form.Item>
            {editMode && (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            )}
          </Form>
          <Button
            type="default"
            onClick={handleEditMode}
            style={{ marginRight: "8px" }}
          >
            {editMode ? "Hủy" : <EditOutlined />}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Account;
