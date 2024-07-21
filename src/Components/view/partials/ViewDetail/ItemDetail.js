import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Input, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../Firebase"; // Adjust the path to your Firebase configuration file
import "./ItemDetail.css";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ItemDetail = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7071/api/product-post/${itemId}`
        );

        const imageUrl = await getImageUrl(response.data.imageUrls[0]);

        setItem({
          ...response.data,
          imageUrl,
        });
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  const getImageUrl = async (imagePath) => {
    if (!imagePath) {
      console.error("Error: imagePath is empty");
      return "default-image-url"; // Fallback to a default image URL if necessary
    }

    try {
      const imageRef = ref(storage, imagePath);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return "default-image-url"; // Fallback to a default image URL if necessary
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBuyNow = async (postId) => {
    try {
      const userToken = localStorage.getItem("accessToken");

      localStorage.setItem("postId", postId); // Save postId to local storage

      const response = await axios.post(
        `https://localhost:7071/api/post-apply/${postId}`,
        JSON.stringify(messageText),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Successfully applied to buy:", response.data);
      message.success("Successfully applied to buy this product!");
    } catch (error) {
      console.error("Error applying to buy product:", error);
      message.error("You need to log in to buy this product.");
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="item-detail-container">
      <img src={item.imageUrl} alt={item.title} className="item-image" />
      <div className="item-details">
        <Title level={2}>{item.title}</Title>
        <Paragraph>Description: {item.description}</Paragraph>
        <Paragraph className="item-price">
          Price: {formatPrice(item.price)}
        </Paragraph>

        {/* Render createdBy information if available */}
        {item.createdBy && (
          <div>
            <Paragraph className="item-fullname">
              Full Name: {item.createdBy.fullName}
            </Paragraph>
            <Paragraph className="item-email">
              Email: {item.createdBy.email}
            </Paragraph>
            <Paragraph className="item-phone">
              Phone Number: {item.createdBy.phoneNumber}
            </Paragraph>
          </div>
        )}

        {item.campus && (
          <Paragraph className="item-campus">Campus: {item.campus}</Paragraph>
        )}

        <TextArea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Enter your message here"
          rows={4}
          style={{ marginBottom: "10px" }}
        />

        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => handleBuyNow(item.id)}
        >
          Buy Now
        </Button>
        <Button
          type="default"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "10px" }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ItemDetail;
