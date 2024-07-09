import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography, message } from "antd";
import "./ShoppingCard.css";
const { Title } = Typography;

const ShoppingCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsData, setCardsData] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchCardsData();
      setCardsData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCardsData = async () => {
    const userToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(
        `https://localhost:7071/api/product-post/others?pageIndex=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const formattedData = response.data.map((item) => ({
        ...item,
        imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
      }));

      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 401) {
        await refreshToken(); // Refresh token if unauthorized
        return fetchCardsData(); // Retry fetching data
      }
      throw error; // Re-throw the error if it's not due to unauthorized
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardsData.slice(indexOfFirstItem, indexOfLastItem);
  const handleBuyNow = async (postId) => {
    try {
      const userToken = localStorage.getItem("accessToken");
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
      // Optionally handle success actions here (e.g., show a success message)
    } catch (error) {
      console.error("Error applying to buy product:", error);
      message.error("Failed to apply to buy this product.");
      // Optionally handle error actions here (e.g., show an error message)
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
              <p className="card-price">{card.price}</p>
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
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`arrow-button ${currentPage === 1 ? "disabled" : ""}`}
        >
          &#8249; {/* Left arrow */}
        </button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= cardsData.length}
          className={`arrow-button ${
            indexOfLastItem >= cardsData.length ? "disabled" : ""
          }`}
        >
          &#8250; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCard;
