import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostCreate.css";

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();
  const [fullname, setFullname] = useState("");
  const [categories, setCategories] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedCategoryObj, setSelectedCategoryObj] = useState(null);
  const [selectedCampusObj, setSelectedCampusObj] = useState(null);
  const [description, setDescription] = useState(""); // State mới để lưu mô tả sản phẩm
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
  }, []);

  // const onFinish = async (values) => {
  //   const { productName, category, price, campus, phone, duration } = values;

  //   const formData = {
  //     title: productName,
  //     description: description, // Sử dụng state mô tả sản phẩm
  //     price,
  //     categoryId: category,
  //     campusId: campus,
  //     postModeId: "cc9a5169-452e-42a6-ae1e-cbc43b9d2448",
  //     imagesUrl: [hardcodedImageUrl],
  //     fullname,
  //     phone,
  //     duration,
  //     productName,
  //     campus,
  //   };

  //   console.log("Posting form data:", formData);

  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     console.log("accessToken", accessToken);
  //     const response = await axios.post(
  //       "https://localhost:7071/api/product-post",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "*/*",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("Post created:", response.data);

  //     // navigate("/payment", {
  //     //   state: { formData, selectedCategoryObj, selectedCampusObj },
  //     // });
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //     // if (error.response && error.response.status === 401) {
  //     //   try {
  //     //     await refreshAccessToken();
  //     //     // Retry original request
  //     //     const newAccessToken = localStorage.getItem("accessToken");
  //     //     const retryResponse = await axios.post(
  //     //       "https://localhost:7071/api/product-post",
  //     //       formData,
  //     //       {
  //     //         headers: {
  //     //           "Content-Type": "application/json",
  //     //           Accept: "*/*",
  //     //           Authorization: `Bearer ${newAccessToken}`,
  //     //         },
  //     //       }
  //     //     );

  //     //     console.log("Post created after token refresh:", retryResponse.data);

  //     //     navigate("/payment", {
  //     //       state: { formData, selectedCategoryObj, selectedCampusObj },
  //     //     });
  //     //   } catch (refreshError) {
  //     //     console.error("Error refreshing token:", refreshError);
  //     //     message.error("Failed to refresh token. Please log in again.");
  //     //     // Redirect to login or handle logout
  //     //   }
  //     // } else {
  //     //   message.error(
  //     //     error.response?.data?.message ||
  //     //       "Failed to create post. Please try again later."
  //     //   );
  //     // }
  //   }
  // };

  const onFinish = async (values) => {
    const { productName, category, price, campus, phone, duration } = values;

    const formData = {
      title: productName,
      description, // Use state description
      price,
      categoryId: category,
      campusId: campus,
      postModeId: "cc9a5169-452e-42a6-ae1e-cbc43b9d2448",
      imagesUrl: [hardcodedImageUrl],
      redirectUrl: "http://localhost:3000/",
    };

    console.log("Posting form data:", formData);

    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);
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
      window.open(response.data);
      // navigate("/payment", {
      //   state: { formData, selectedCategoryObj, selectedCampusObj },
      // });
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      message.error(
        error.response?.data?.message ||
          "Failed to create post. Please try again later."
      );
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        "https://localhost:7071/api/refresh-token",
        { refreshToken }
      );

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      throw new Error("Error refreshing token");
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
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select
              placeholder="Select category"
              onChange={(value) => {
                setSelectedCategoryObj(
                  categories.find((cat) => cat.id === value)
                );
              }}
            >
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            name="campus"
            label="Campus"
            rules={[{ required: true, message: "Please select campus" }]}
          >
            <Select
              placeholder="Select campus"
              onChange={(value) => {
                setSelectedCampusObj(campuses.find((cp) => cp.id === value));
              }}
            >
              {campuses.map((campus) => (
                <Option key={campus.id} value={campus.id}>
                  {campus.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Contact Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter contact phone number",
              },
              {
                pattern: new RegExp(/^[0-9\b]+$/),
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input placeholder="Enter contact phone number" />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Post Duration"
            rules={[{ required: true, message: "Please select post duration" }]}
          >
            <Select placeholder="Select post duration">
              <Option value="7 days">7 days</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Post
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* Display hardcoded image */}
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
