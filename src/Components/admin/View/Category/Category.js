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
} from "antd";
import axiosInstance from "../../../../authService";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../layout/header/AdminLayout";
import { useAuth } from "../../../Hook/useAuth";

const { Title } = Typography;
const { Option } = Select;

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
      const updatedCategory = {
        id: selectedCategory.id,
        name: values.name,
      };
      const response = await axiosInstance.put(
        `https://localhost:7071/api/category/${selectedCategory.id}`,
        updatedCategory
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        setReload(!reload); // Trigger reload of categories
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
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
          onClick={() => setIsModalOpen(true)}
          style={{ marginBottom: 16 }}
        >
          Add Category
        </Button>
        <Table columns={columns} dataSource={categories} rowKey="id" />

        <Modal
          title="Edit Category"
          visible={isModalOpen}
          onOk={handleSaveCategory}
          onCancel={() => setIsModalOpen(false)}
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
