import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostCreate.css";

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [fullname, setFullname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fullname = localStorage.getItem("fullname");
    if (fullname) {
      setFullname(fullname);
    }
  }, []);

  const onFinish = async (values) => {
    if (!imagePreviewUrl) {
      message.error("Vui lòng upload hình ảnh trước khi đăng bài!");
      return;
    }

    const { productName, category, price, campus, phone, duration } = values;

    const formData = {
      title: productName,
      description: category,
      price,
      categoryId: category,
      campusId: campus,
      postModeId: "cc9a5169-452e-42a6-ae1e-cbc43b9d2448", // Use the given postModeId for 7 days
      imagesUrl: [imagePreviewUrl],
      fullname,
      productName,
      campus,
      phone,
      duration,
    };

    console.log("Posting form data:", formData);

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://localhost:7071/api/product-post",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Post created:", response.data);

      navigate("/payment", { state: { formData } });
    } catch (error) {
      console.error("Error creating post:", error);
      message.error("Failed to create post. Please try again later.");
    }
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

  const handleImageUrlChange = (e) => {
    const imageUrl = e.target.value;
    setImagePreviewUrl(imageUrl);
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
              <Option value="40b5d134-c705-45f7-9647-d9339b3532a2">
                Calculator
              </Option>
              <Option value="3dca2b4f-6632-4772-9ceb-6d4fbfafb375">
                Laptop
              </Option>
              <Option value="5f2b41a5-3a87-4085-952d-88659f9ccd59">
                Mouse
              </Option>
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
            rules={[{ required: true, message: "Vui lòng chọn campus" }]}
          >
            <Select placeholder="Chọn campus">
              <Option value="f39619b8-4f58-41ae-b4fb-4e42107df882">
                Cần Thơ
              </Option>
              <Option value="f9ab8a24-5f40-4c8a-b096-857f7de97942">
                Đà Nẵng
              </Option>
              <Option value="ef565513-b987-4692-a1dd-8c0ac0f23861">
                Hà Nội
              </Option>
              <Option value="2ff2a074-9086-43aa-a0ca-3e5e604779d5">
                Hồ Chí Minh
              </Option>
              <Option value="7f92a365-7486-4560-aec2-0a59795d7c68">
                Quy Nhơn
              </Option>
              <Option value="c0b0c9a1-7eae-4c03-ad29-a2c94b14bb6d">
                Other
              </Option>
            </Select>
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
              <Option value="7 ngày">7 ngày</Option>
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
          <Input
            placeholder="Nhập URL ảnh"
            onChange={handleImageUrlChange}
            style={{ marginTop: "10px" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default PostCreate;
