import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ShoppingCard.css";
import { Typography } from "antd";
const { Title } = Typography;

const ShoppingCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsData, setCardsData] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `https://localhost:7071/api/product-post/others?pageIndex=1`
        );
        const response2 = await axios.get(
          `https://localhost:7071/api/product-post/others?pageIndex=2`
        );

        const formattedData1 = response1.data.map((item) => ({
          ...item,
          imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
        }));

        const formattedData2 = response2.data.map((item) => ({
          ...item,
          imageUrl: "https://lawnet.vn/uploads/image/2023/10/14/075118331.jpg",
        }));

        setCardsData([...formattedData1, ...formattedData2]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardsData.slice(indexOfFirstItem, indexOfLastItem);

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
                <button className="buy-now-button">Buy Now</button>
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
