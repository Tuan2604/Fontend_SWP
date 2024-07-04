import React, { useState } from "react";
import { Form, Input, Button, Select, Card } from "antd";
import "./PostCreate.css"; // Import the custom CSS

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Add logic to handle form submission along with the image
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Card
          title="Create New Post"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <Form
            form={form}
            name="create_post"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="productName"
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm",
                },
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn danh mục",
                },
              ]}
            >
              <Select placeholder="Chọn danh mục">
                <Option value="category1">Danh mục 1</Option>
                <Option value="category2">Danh mục 2</Option>
                <Option value="category3">Danh mục 3</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
              name="campus"
              label="Campus"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập campus",
                },
              ]}
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng bài
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <div style={{ width: "50px" }}></div>
        <Card title="Add Image" style={{ maxWidth: "600px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
    </div>
  );
};

export default PostCreate;
