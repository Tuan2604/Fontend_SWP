import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../src/authService"; // Import axios instance
import "./Payment.css"; // Import custom CSS

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, selectedCategoryObj, selectedCampusObj } = location.state;
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [campusName, setCampusName] = useState("");
  const [countdown, setCountdown] = useState(45); // Countdown timer in seconds

  const hardcodedImageUrl =
    "https://gcs.tripi.vn/public-tripi-feed/img/474088jmW/anh-cay-bang-mua-la-rung_093243431.jpg";

  // Use effect to fetch category and campus names
  useEffect(() => {
    const fetchCategoryAndCampus = async () => {
      try {
        if (selectedCategoryObj && selectedCategoryObj.id) {
          const categoryResponse = await axiosInstance.get(
            `category/${selectedCategoryObj.id}`
          );
          setCategoryName(categoryResponse.data.name);
          setCategoryDescription(categoryResponse.data.description);
        }

        if (selectedCampusObj && selectedCampusObj.id) {
          const campusResponse = await axiosInstance.get(
            `campus/${selectedCampusObj.id}`
          );
          setCampusName(campusResponse.data.name);
        }
      } catch (error) {
        console.error("Error fetching category or campus:", error);
      }
    };

    fetchCategoryAndCampus();

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          navigate("/payment/payfail"); // Navigate to payfail page after countdown ends
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedCategoryObj, selectedCampusObj, navigate]);

  const handleConfirmClick = () => {
    // Navigate to payment page when confirm button is clicked
    navigate("/payment/payment-success");
  };

  return (
    <div className="payment-container">
      <Card title="Payment Details" className="payment-card">
        <h2>Product Information</h2>
        <p>
          <strong>Product Name:</strong> {formData.title}
        </p>
        <p>
          <strong>Description:</strong> {formData.description}
        </p>
        <p>
          <strong>Price:</strong> {formData.price}
        </p>
        <p>
          <strong>Category:</strong> {categoryName}
        </p>
        <p>
          <strong>Category Description:</strong> {categoryDescription}
        </p>
        <p>
          <strong>Campus:</strong> {campusName}
        </p>
        <p>
          <strong>Fullname:</strong> {formData.fullname}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
        <p>
          <strong>Duration:</strong> {formData.duration}
        </p>
        <div className="upload-image-container">
          <img
            src={hardcodedImageUrl}
            style={{ width: "100%", marginBottom: "10px" }}
            alt="Post"
          />
        </div>
        <button onClick={handleConfirmClick}>Confirm Payment</button>
        <p>
          <strong>Redirecting to payment failure in:</strong> {countdown}{" "}
          seconds
        </p>
      </Card>
    </div>
  );
};

export default Payment;
