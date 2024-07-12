import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Card, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storage } from "../../../../Firebase"; // Import Firebase storage
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./PostCreate.css";

const { Option } = Select;

const PostCreate = () => {
  const [form] = Form.useForm();
  const [fullname, setFullname] = useState("");
  const [categories, setCategories] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [durations, setDurations] = useState([]);
  const [selectedCategoryObj, setSelectedCategoryObj] = useState(null);
  const [selectedCampusObj, setSelectedCampusObj] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesResponse, campusesResponse, durationsResponse] =
          await Promise.all([
            axios.get("https://localhost:7071/api/category"),
            axios.get(
              "https://localhost:7071/api/campus/get-all?pageIndex=1&pageSize=10"
            ),
            axios.get("https://localhost:7071/api/post-mode/active"),
          ]);

        setCategories(categoriesResponse.data);
        setCampuses(campusesResponse.data);
        setDurations(durationsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data. Please try again later.");
      }
    };

    fetchInitialData();

    const storedFullname = localStorage.getItem("fullname");
    if (storedFullname) {
      setFullname(storedFullname);
    }
  }, []);

  const handleUpload = async (file) => {
    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
        setUploading(false);
        message.error("Failed to upload image. Please try again.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageUrl(downloadURL);
        setUploading(false);
        message.success("Image uploaded successfully.");
      }
    );
  };

  const onFinish = async (values) => {
    const { productName, category, price, campus, phone, duration } = values;

    const formData = {
      title: productName,
      description: "Sample Description", // Replace with actual description if available
      price: price.toString(), // Convert price to string if needed
      categoryId: category, // Ensure this is a valid category ID
      campusId: campus, // Ensure this is a valid campus ID
      postModeId: duration, // Ensure this is a valid post mode ID
      imagesUrl: [imageUrl], // Ensure imageUrl is correctly set
      redirectUrl: "http://localhost:3000",
    };

    console.log("Form data being sent:", formData);

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
      console.log("Post created:", response.data.paymentUrl);
      console.log("payment id:", response.data.paymentId);
      localStorage.setItem("paymentId", response.data.paymentId);
      window.open(response.data.paymentUrl);
    } catch (error) {
      console.error("Error creating post:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        message.error(
          error.response.data.message ||
            "Failed to create post. Please try again later."
        );
      } else {
        message.error("Failed to create post. Please try again later.");
      }
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
          initialValues={{
            productName: "",
            description: "",
            category: undefined,
            price: "",
            campus: undefined,
            phone: "",
            duration: undefined,
          }}
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
              { required: true, message: "Please enter contact phone number" },
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
            <Select
              placeholder="Select post duration"
              onChange={(value) => {
                setSelectedDuration(durations.find((dur) => dur.id === value));
              }}
            >
              {durations.map((duration) => (
                <Option key={duration.id} value={duration.id}>
                  {duration.type} - {duration.price} VNĐ
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Upload Image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              customRequest={({ file, onSuccess }) => {
                handleUpload(file);
                onSuccess("ok"); // Indicate that the upload was successful
              }}
              listType="picture"
            >
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={uploading}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Create Post"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PostCreate;
