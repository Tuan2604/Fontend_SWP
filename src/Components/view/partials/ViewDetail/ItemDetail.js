import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { PhoneOutlined, WechatOutlined } from "@ant-design/icons";
import axios from "axios";
import "./ItemDetail.css";

const { Title, Paragraph } = Typography;

const ItemDetail = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7071/api/product-post/${itemId}`
        );
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  // Set a default image URL if item.imageUrl is not available
  const imageUrl =
    item.imageUrl || "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg";

  // Format price with thousand separators and VND suffix
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="item-detail-container">
      <img src={imageUrl} alt={item.title} className="item-image" />
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

        <div className="contact-buttons">
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            className="contact-button"
          >
            Gọi điện
          </Button>

          <Link to={`/chat/${itemId}`} className="chat-link">
            <Button
              type="default"
              icon={<WechatOutlined />}
              className="contact-button"
            >
              Chat
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
