import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostCreate.css";

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();
  const [fullname, setFullname] = useState("");
  const [categories, setCategories] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const navigate = useNavigate();
  const hardcodedImageUrl =
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474088jmW/anh-cay-bang-mua-la-rung_093243431.jpg";

  useEffect(() => {
    const fetchCategoriesAndCampuses = async () => {
      try {
        const [categoriesResponse, campusesResponse] = await Promise.all([
          axios.get("https://localhost:7071/api/category"),
          axios.get(
            "https://localhost:7071/api/campus/get-all?pageIndex=1&pageSize=10"
          ),
        ]);

        setCategories(categoriesResponse.data);
        setCampuses(campusesResponse.data);
      } catch (error) {
        console.error("Error fetching categories and campuses:", error);
        message.error(
          "Failed to fetch categories and campuses. Please try again later."
        );
      }
    };

    fetchCategoriesAndCampuses();

    const storedFullname = localStorage.getItem("fullname");
    if (storedFullname) {
      setFullname(storedFullname);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const onFinish = async (values) => {
    const { productName, category, price, campus, phone, duration } = values;

    const formData = {
      title: productName,
      description: category,
      price,
      categoryId: category, // Assuming category ID is correct
      campusId: campus, // Assuming campus ID is correct
      postModeId: "cc9a5169-452e-42a6-ae1e-cbc43b9d2448", // Use the given postModeId for 7 days
      imagesUrl: [hardcodedImageUrl],
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
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
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
              {campuses.map((campus) => (
                <Option key={campus.id} value={campus.id}>
                  {campus.name}
                </Option>
              ))}
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
          <img
            src={hardcodedImageUrl}
            style={{ width: "100%", marginBottom: "10px" }}
            alt="Post"
          />
        </div>
      </Card>
    </div>
  );
};

export default PostCreate;
