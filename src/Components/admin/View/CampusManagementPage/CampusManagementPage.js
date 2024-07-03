import React, { useState, useEffect } from "react";
import { Space, Table, Modal, Form, Input, Button, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CampusManagementPage.css";
import AdminLayout from "../../../layout/header/AdminLayout";

const { Title } = Typography;

const CampusManagementPage = ({ isLoggedIn, setShowHeader, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
    handleFetchData();
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [isLoggedIn, reload, setShowHeader, navigate]);

  const handleFetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7071/api/campuses");
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching campus data");
    }
  };

  const handleEditCampus = (record) => {
    setSelectedItem(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: record.name,
      location: record.location,
    });
  };

  const handleSaveCampus = async () => {
    try {
      const values = await form.validateFields();
      const updatedCampus = {
        id: selectedItem.id,
        name: values.name,
        location: values.location,
      };
      const response = await axios.put(
        `https://localhost:7071/api/campuses/${selectedItem.id}`,
        updatedCampus
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        setReload(!reload);
      } else {
        console.error("Failed to update campus");
      }
    } catch (error) {
      console.error("Error updating campus:", error);
    }
  };

  const handleDeleteCampus = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7071/api/campuses/${id}`
      );
      if (response.status === 200) {
        setReload(!reload);
      } else {
        console.error("Failed to delete campus");
      }
    } catch (error) {
      console.error("Error deleting campus:", error);
    }
  };

  const handleAddCampus = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleSaveNewCampus = async () => {
    try {
      const values = await form.validateFields();
      const newCampus = {
        name: values.name,
        location: values.location,
      };
      const response = await axios.post(
        "https://localhost:7071/api/campuses",
        newCampus
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        setReload(!reload);
      } else {
        console.error("Failed to add campus");
      }
    } catch (error) {
      console.error("Error adding campus:", error);
    }
  };

  const handleSave = () => {
    if (selectedItem) {
      handleSaveCampus();
    } else {
      handleSaveNewCampus();
    }
  };

  const columns = [
    {
      title: "Campus Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditCampus(record)}>Edit</a>
          <a onClick={() => handleDeleteCampus(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout onLogout={() => navigate("/admin/login", { replace: true })}>
      <div className="campus-management-container">
        <Title level={3}>Campus Management</Title>
        <Button
          type="primary"
          onClick={handleAddCampus}
          style={{ marginBottom: 16 }}
        >
          Add Campus
        </Button>
        <Table columns={columns} dataSource={data} rowKey="id" />

        <Modal
          title={selectedItem ? "Edit Campus" : "Add Campus"}
          visible={isModalOpen}
          onOk={handleSave}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Campus Name"
              rules={[{ required: true, message: "Please enter campus name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default CampusManagementPage;
