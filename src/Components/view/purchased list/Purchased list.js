import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axiosInstance from "../../../axiosConfig";
import "./Purchased list.css";

const PurchasedList = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPurchasedItems();
  }, []);

  const fetchPurchasedItems = async () => {
    try {
      const response = await axiosInstance.get(
        "https://localhost:7071/api/post-apply/buying/me?pageIndex=1"
      );
      setPurchasedItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching purchased items:", error);
      setError("Failed to fetch purchased items. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="purchased-list">Loading...</div>;
  }

  if (error) {
    return <div className="purchased-list">{error}</div>;
  }

  return (
    <div className="purchased-list">
      <Card title="Purchased Items" className="payment-card">
        {purchasedItems.length > 0 ? (
          <ul className="purchased-items-list">
            {purchasedItems.map((item) => (
              <li key={item.id} className="purchased-item">
                <div className="item-header">
                  <h2>{item.title}</h2>
                  {item.imageUrls && item.imageUrls.length > 0 && (
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="item-image"
                    />
                  )}
                </div>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <p>Category: {item.category}</p>
                <p>Post Mode: {item.postMode}</p>
                <p>Campus: {item.campus}</p>
                <p>Created By: {item.createdBy.fullName}</p>
                <p>Email: {item.createdBy.email}</p>
                <p>Phone: {item.createdBy.phoneNumber}</p>
                <p>
                  Created Date:{" "}
                  {new Date(item.createdDate).toLocaleDateString()}
                </p>
                <p>
                  Expired Date:{" "}
                  {new Date(item.expiredDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No purchased items found.</p>
        )}
      </Card>
    </div>
  );
};

export default PurchasedList;
