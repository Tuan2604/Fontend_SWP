import React, { useState } from "react";
import "./ShoppingCard.css"; // Import the CSS file for ShoppingCard component styling
import { Input, Typography } from "antd"; // Import Typography from Ant Design
const { Title } = Typography; // Destructure Title from Typography

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
  // Add more items if needed to test pagination
];

const itemsPerPage = 8;

const ShoppingCard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate indexes for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardsData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
                <button className="buy-now-button">Buy Now</button>
                <button className="view-details-button">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="arrow-button"
        >
          &#8249; {/* Left arrow */}
        </button>
        {Array.from({ length: Math.ceil(cardsData.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= cardsData.length}
          className="arrow-button"
        >
          &#8250; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
};

export default ShoppingCard;
