import React, { useState, useEffect } from "react";
import { Space, Table, Typography, Modal, Form, Input, Button } from "antd";
import axiosInstance from "../../../../authService";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/header/AdminLayout";
import { useAuth } from "../../../Hook/useAuth";

const { Title } = Typography;

const UserManagementPage = () => {
  const { isLogin, setIsLogin, setUserInformation } = useAuth();
  const navigate = useNavigate();

  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login"); // Redirect to admin login if not logged in
      return;
    }
    fetchCategories();
    return () => {
      // Cleanup if needed
    };
  }, [isLogin, reload, navigate]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(
        "https://localhost:7071/api/category"
      );
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("An error occurred while fetching categories");
    }
  };

  const handleEditCategory = (record) => {
    setSelectedCategory(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: record.name,
    });
  };

  const handleSaveCategory = async () => {
    try {
      const values = await form.validateFields();
      const endpoint = selectedCategory
        ? `https://localhost:7071/api/category/${selectedCategory.id}`
        : "https://localhost:7071/api/category";
      const method = selectedCategory ? "PUT" : "POST";

      const data = selectedCategory
        ? { id: selectedCategory.id, name: values.name }
        : { name: values.name };

      const response = await axiosInstance({
        method,
        url: endpoint,
        data,
      });

      if (response.status === 200) {
        setIsModalOpen(false);
        setReload(!reload); // Trigger reload of categories
        setSelectedCategory(null); // Clear selected category
        form.resetFields(); // Reset form fields
      } else {
        console.error("Failed to save category");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `https://localhost:7071/api/category/${id}`
      );
      if (response.status === 200) {
        setReload(!reload); // Trigger reload of categories
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserInformation({});
    navigate("/login", { replace: true });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditCategory(record)}>Edit</a>
          <a onClick={() => handleDeleteCategory(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="user-management-container">
        <Title level={3}>Category Management</Title>
        <Button
          type="primary"
          onClick={() => {
            setSelectedCategory(null); // Clear selected category
            setIsModalOpen(true);
          }}
          style={{ marginBottom: 16 }}
        >
          Add Category
        </Button>
        <Table columns={columns} dataSource={categories} rowKey="id" />

        <Modal
          title={selectedCategory ? "Edit Category" : "Add Category"}
          visible={isModalOpen}
          onOk={handleSaveCategory}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedCategory(null); // Clear selected category
            form.resetFields(); // Reset form fields
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Category Name"
              rules={[
                { required: true, message: "Please enter category name" },
              ]}
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
