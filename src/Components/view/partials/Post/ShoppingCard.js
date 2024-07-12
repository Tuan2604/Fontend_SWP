import React, { useEffect, useState } from "react";
import { Card, Button, Pagination, Image } from "antd";
import axios from "axios";
import "./ShoppingCard.css";

const ShoppingCard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7071/api/product-post/all?status=Waiting&pageIndex=${currentPage}&pageSize=${pageSize}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="shopping-card-container">
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          extra={<Button type="link">View Details</Button>}
          style={{ marginBottom: "20px" }}
        >
          <div className="shopping-card-content">
            <Image
              width={200}
              src={post.imagesUrl?.[0] || "default-image-url"} // Ensure default image if none is provided
              alt={post.title}
            />
            <div className="shopping-card-info">
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <Button type="primary">Buy Now</Button>
            </div>
          </div>
        </Card>
      ))}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={40} // Adjust this based on your total data count
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default ShoppingCard;
