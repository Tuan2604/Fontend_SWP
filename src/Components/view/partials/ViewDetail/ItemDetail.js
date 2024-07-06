import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography } from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import "./ItemDetail.css";

const { Title, Paragraph } = Typography;

const cardsData = [
  {
    imageUrl:
      "https://nhatkyduhoc.vn/wp-content/uploads/2020/12/ta%CC%80i-lie%CC%A3%CC%82u-o%CC%82n-thi-640x358-1.png",
    title: "Tài Liệu SV",
    description: "Description of Card 1",
    price: "10,000vnd",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "20,000vnd",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "20,000vnd",
  },

  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "20,000vnd",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "20,000vnd",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "20,000vnd",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "20,000vnd",
  },
  {
    imageUrl:
      "https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "$20,000",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "$20,000",
  },
  {
    imageUrl:
      "https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "$20,000",
  },
  {
    imageUrl:
      "https://giadungnhaviet.com/wp-content/uploads/2018/09/bo-mach-dieu-khien-arduino-r3-2.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "$20,000",
  },
  {
    imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "$20,000",
  },
  {
    imageUrl:
      "https://giadungnhaviet.com/wp-content/uploads/2018/09/bo-mach-dieu-khien-arduino-r3-2.jpg",
    title: "Tài liệu prj",
    description: "Description of Card 2",
    price: "$20,000",
  },
  {
    imageUrl:
      "https://giadungnhaviet.com/wp-content/uploads/2018/09/bo-mach-dieu-khien-arduino-r3-2.jpg",
    title: "Bang mach dien tu",
    description: "Description of Card 3",
    price: "$30,000",
  },
  {
    imageUrl:
      "https://library.fpt.edu.vn/Uploads/HN/Images/Catalogue/FPT190025804.png",
    title: "Sach kanji co ban",
    description: "Description of Card 4",
    price: "$40,000",
  },
  {
    imageUrl:
      "https://dongphuccati.com/images/products/2020/05/18/original/2-1.jpg",
    title: "Ao fpt",
    description: "Description of Card 5",
    price: "$50,000",
  },
];

const ItemDetail = () => {
  const { itemId } = useParams();
  const item = cardsData[itemId];

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="item-detail-container">
      <img src={item.imageUrl} alt={item.title} className="item-image" />
      <div className="item-details">
        <Title level={2}>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph className="item-price">{item.price}</Paragraph>
        <div className="contact-buttons">
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            className="contact-button"
          >
            Gọi điện
          </Button>

          {/* Styling the Link component to remove underline */}
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
