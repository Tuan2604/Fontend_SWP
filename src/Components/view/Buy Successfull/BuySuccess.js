import React, { useState, useEffect } from "react";
import { Card } from "antd";
import axiosInstance from "../../../authService";
import { useAuth } from "../../Hook/useAuth";
import "./BuySuccess.css";

const BuyerSuccess = () => {
  const [buyerHistory, setBuyerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInformation } = useAuth();

  const fetchBuyerHistory = async () => {
    try {
      const response = await axiosInstance.get(
        `https://localhost:7071/api/post-apply/buyed/me?pageIndex=1`
      );
      setBuyerHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.error("API Error:", error.message);
      setError(`Failed to fetch buyer history: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerHistory();
  }, []);

  if (loading) {
    return <div className="buyer-history">Loading...</div>;
  }

  if (error) {
    return <div className="buyer-history">{error}</div>;
  }

  if (buyerHistory.length === 0) {
    return <div className="buyer-history">No purchased posts found.</div>;
  }

  return (
    <div className="buyer-history">
      <Card title="Buyer History" className="buyer-history-card">
        <div className="post-list">
          {buyerHistory.map((post) => (
            <div key={post.id} className="post-item">
              <div className="item-header">
                <h2>{post.title}</h2>
                {post.imageUrls && post.imageUrls.length > 0 && (
                  <img
                    src={post.imageUrls[0]}
                    alt={post.title}
                    className="item-image"
                  />
                )}
              </div>
              <div className="post-details">
                <p>Description: {post.description}</p>
                <p>Price: {post.price}</p>
                <p>Category: {post.category}</p>
                <p>Post Mode: {post.postMode}</p>
                <p>Campus: {post.campus}</p>
                <p>
                  Created Date:{" "}
                  {new Date(post.createdDate).toLocaleDateString()}
                </p>
                <p>
                  Expired Date:{" "}
                  {new Date(post.expiredDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BuyerSuccess;
