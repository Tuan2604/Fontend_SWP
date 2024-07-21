import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  message,
  Pagination,
  Empty,
  Modal,
  Button,
  Select,
} from "antd";
import "./ShoppingCard.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../Firebase";

const { Title } = Typography;
const { Option } = Select;

const ShoppingCard = () => {
  // State definitions
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [reportReason, setReportReason] = useState(null);
  const itemsPerPage = 8; // Number of items per page
  const navigate = useNavigate();

  // Fetch data on page change
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchCardsData();
      setCardsData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch cards data
  const fetchCardsData = async () => {
    const userToken = localStorage.getItem("accessToken");
    const pageIndex = currentPage; // API expects 1-based index

    try {
      const response = await axios.get(
        `https://localhost:7071/api/product-post/others?pageIndex=${pageIndex}`,
        {
          headers: userToken ? { Authorization: `Bearer ${userToken}` } : {},
        }
      );

      // Format data with image URLs
      const formattedData = await Promise.all(
        response.data.map(async (item) => {
          const imageUrl = await getImageUrl(item.imageUrls[0]);
          return { ...item, imageUrl };
        })
      );

      return formattedData;
    } catch (error) {
      if (error.response && error.response.status === 401 && userToken) {
        await refreshToken(); // Retry after refreshing the token
        return fetchCardsData();
      }
      throw error;
    }
  };

  // Function to get image URL
  const getImageUrl = async (imagePath) => {
    if (!imagePath) return "default-image-url"; // Fallback image URL

    try {
      const imageRef = ref(storage, imagePath);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return "default-image-url";
    }
  };

  // Function to refresh token
  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    try {
      const response = await axios.post(
        "https://localhost:7071/api/refresh-token",
        { refreshToken: storedRefreshToken }
      );
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
      } else {
        handleSessionExpiration();
      }
    } catch (error) {
      handleSessionExpiration();
    }
  };

  // Function to handle session expiration
  const handleSessionExpiration = () => {
    message.error("Your login session expired. Please log in again.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Function to handle Buy Now button click
  const handleBuyNow = async (postId) => {
    const userToken = localStorage.getItem("accessToken");
    if (!userToken) {
      message.error("You need to log in to buy this product.");
      return;
    }

    const messageData = "Tôi muốn mua vật phẩm này"; // Custom message

    try {
      localStorage.setItem("postId", postId);
      await axios.post(
        `https://localhost:7071/api/post-apply/${postId}`,
        JSON.stringify({ message: messageData }),
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Successfully applied to buy this product!");
    } catch (error) {
      console.error("Error applying to buy product:", error);
      message.error("Failed to apply to buy this product.");
    }
  };

  // Function to show report modal
  const showReportModal = (postId) => {
    setSelectedPostId(postId);
    setReportModalVisible(true);
  };

  // Function to handle report submit
  const handleReportSubmit = async () => {
    if (!reportReason) {
      message.error("Please select a reason for reporting.");
      return;
    }

    const userToken = localStorage.getItem("accessToken");
    const createdBy = localStorage.getItem("userId");

    try {
      await axios.post(
        "https://localhost:7071/api/report/create",
        {
          productPostId: selectedPostId,
          createdBy: createdBy,
          reasons: [reportReason],
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      message.success("Report submitted successfully.");
      setReportModalVisible(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      message.error("Failed to submit report.");
    }
  };

  // Calculations for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardsData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <Title level={2} style={{ textAlign: "left", margin: "20px 0" }}>
        Available Products
      </Title>
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : cardsData.length === 0 ? (
        <Empty description="No Data" />
      ) : (
        <div className="shopping-cards-container">
          {currentItems.map((card) => (
            <div key={card.id} className="shopping-card">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <p className="card-price">{formatPrice(card.price)}</p>
                <div className="card-buttons">
                  <div className="button-group">
                    <Button
                      type="primary"
                      className="buy-now-button"
                      onClick={() => handleBuyNow(card.id)}
                    >
                      Buy Now
                    </Button>
                    <Link to={`/item/${card.id}`}>
                      <Button className="view-details-button">
                        View Details
                      </Button>
                    </Link>
                  </div>
                  <Button
                    className="report-button"
                    onClick={() => showReportModal(card.id)}
                  >
                    Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        current={currentPage}
        pageSize={itemsPerPage}
        total={cardsData.length} // Adjust based on actual total
        onChange={handlePageChange}
      />
      <Modal
        title="Report Product"
        visible={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        onOk={handleReportSubmit}
      >
        <Select
          placeholder="Select a reason for reporting"
          onChange={(value) => setReportReason(value)}
          style={{ width: "100%" }}
        >
          <Option value={0}>Spam</Option>
          <Option value={1}>Inappropriate Content</Option>
          <Option value={2}>Other</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default ShoppingCard;
