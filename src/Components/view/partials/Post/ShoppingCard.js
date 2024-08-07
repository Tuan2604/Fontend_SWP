import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography, message, Pagination } from "antd";
import "./ShoppingCard.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../Firebase"; // Adjust the path to your Firebase configuration file

const { Title } = Typography;

const ShoppingCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsData, setCardsData] = useState([]);
  const itemsPerPage = 8;
  const pageSize = 5; // Number of items per page for pagination

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      console.log(`Fetching data for page: ${currentPage}`);
      const response = await fetchCardsData();
      console.log("Fetched data:", response);
      setCardsData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCardsData = async () => {
    const userToken = localStorage.getItem("accessToken");
    const pageIndex = currentPage - 1; // Adjusting pageIndex to start from 0 for API

    try {
      const response = await axios.get(
        `https://localhost:7071/api/product-post/others?pageIndex=${pageIndex}`,
        {
          headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
        }
      );

      console.log("API response:", response.data);

      const formattedData = await Promise.all(
        response.data.map(async (item) => {
          const imageUrl = await getImageUrl(item.imageUrls[0]); // Assuming imageUrls is an array
          return {
            ...item,
            imageUrl,
          };
        })
      );

      console.log("Formatted data:", formattedData);

      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401 && userToken) {
        await refreshToken(); // Refresh token if unauthorized
        return fetchCardsData(); // Retry fetching data
      }
      throw error; // Re-throw the error if it's not due to unauthorized
    }
  };

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

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        "https://localhost:7071/api/refresh-token",
        {
          refreshToken: refreshToken,
        }
      );

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure (e.g., logout user)
      throw error; // Re-throw the error to propagate it up
    }
  };

  const handlePageChange = (page) => {
    console.log(`Changing to page: ${page}`);
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardsData.slice(indexOfFirstItem, indexOfLastItem);

  console.log("Current items:", currentItems);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleBuyNow = async (postId) => {
    try {
      const userToken = localStorage.getItem("accessToken");
      if (!userToken) {
        message.error("You need to log in to buy this product.");
        return;
      }
      const messageData = "Tôi muốn mua vật phẩm này"; // Replace with your message

      localStorage.setItem("postId", postId); // Save postId to local storage

      const response = await axios.post(
        `https://localhost:7071/api/post-apply/${postId}`,
        JSON.stringify(messageData), // Convert messageData to JSON string
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
      message.error("Failed to apply to buy this product.");
    }
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: "left", margin: "20px 0" }}>
        PostNews
      </Title>
      <div className="shopping-cards-container">
        {currentItems.map((card, index) => (
          <div key={index} className="shopping-card">
            <img src={card.imageUrl} alt={card.title} className="card-image" />
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <p className="card-price">{formatPrice(card.price)}</p>
              <div className="card-buttons">
                <button
                  className="buy-now-button"
                  onClick={() => handleBuyNow(card.id)}
                >
                  Buy Now
                </button>
                <Link to={`/item/${card.id}`}>
                  <button className="view-details-button">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={cardsData.length} // Total number of items, adjust as needed
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ShoppingCard;
