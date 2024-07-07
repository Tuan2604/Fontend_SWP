import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, message } from "antd"; // Import necessary components from antd
import { useNavigate } from "react-router-dom";
import "./PostCreate.css"; // Import the custom CSS

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fullname = localStorage.getItem("fullname");
    if (fullname) {
      setFullname(fullname);
    }
  }, []);

  const onFinish = (values) => {
    if (!imagePreviewUrl) {
      message.error("Vui lòng upload hình ảnh trước khi đăng bài!");
      return;
    }

    const formData = { ...values, image: imagePreviewUrl, fullname };
    console.log("Received values of form: ", values);
    navigate("/payment", { state: { formData } }); // Navigate to the payment page with form data
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="post-create-container">
      <Card title="Create New Post" className="post-create-form">
        <Form
          form={form}
          name="create_post"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="productName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Danh mục"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value="Tài liệu">Tài liệu</Option>
              <Option value="Dụng cụ học tập">Dụng cụ học tập</Option>
              <Option value="Vật phẩm">Vật phẩm</Option>
              <Option value="Thiết bị học tập">Thiết bị học tập</Option>
              <Option value="Đồng phục FPT">Đồng phục FPT</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá tiền"
            rules={[{ required: true, message: "Vui lòng nhập giá tiền" }]}
          >
            <Input placeholder="Nhập giá tiền" />
          </Form.Item>

          <Form.Item
            name="campus"
            label="Campus"
            rules={[{ required: true, message: "Vui lòng nhập campus" }]}
          >
            <Input placeholder="Nhập campus" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại liên hệ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại liên hệ",
              },
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Vui lòng nhập số điện thoại hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại liên hệ" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Thời gian đăng bài"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian đăng bài" },
            ]}
          >
            <Select placeholder="Chọn thời gian đăng bài">
              <Option value="1 tuần">1 tuần</Option>
              <Option value="2 tuần">2 tuần</Option>
              <Option value="4 tuần">4 tuần</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng bài
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Add Image" className="post-create-image">
        <div className="upload-image-container">
          {imagePreviewUrl ? (
            <img
              src={imagePreviewUrl}
              style={{ width: "100%", marginBottom: "10px" }}
              alt="Post"
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AGzlRpgqlOr5T1dx1m4lzmtwPDBxsGIzZQ&s"
              style={{ width: "100%", marginBottom: "10px" }}
              alt="Post"
            />
          )}
          <input
            type="file"
            id="file-input"
            className="custom-file-input"
            onChange={handleImageChange}
          />
          <label htmlFor="file-input" className="custom-file-label">
            Upload Image
          </label>
        </div>
      </Card>
    </div>
  );
};

export default PostCreate;
