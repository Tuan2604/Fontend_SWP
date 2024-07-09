import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import QRCode from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../src/authService"; // Import axios instance
import "./Payment.css"; // Import custom CSS
import { Footer } from "antd/es/layout/layout";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, selectedCategoryObj, selectedCampusObj } = location.state;
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [campusName, setCampusName] = useState("");
  const [countdown, setCountdown] = useState(45); // Countdown timer in seconds

  const hardcodedImageUrl =
    "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474088jmW/anh-cay-bang-mua-la-rung_093243431.jpg";

  // Use effect to fetch category and campus names by IDs
  useEffect(() => {
    if (selectedCategoryObj) {
      setCategoryName(selectedCategoryObj.name);
      setCategoryDescription(selectedCategoryObj.description);
    }
    if (selectedCampusObj) {
      setCampusName(selectedCampusObj.name);
    }
  }, [selectedCategoryObj, selectedCampusObj]);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          navigate("/payfail");
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Clean up timer on component unmount
    return () => clearInterval(timer);
  }, [navigate]);

  const handlePaymentSuccess = () => {
    navigate("/payment/payment-success");
  };

  return (
    <div className="payment-card">
      <Card title="Payment Details" className="payment-card">
        <div className="payment-info-container">
          <div className="payment-image-container">
            <img src={hardcodedImageUrl} alt="Post" className="payment-image" />
          </div>
          <div className="payment-info">
            <p>
              <strong>Product Name:</strong> {formData.productName}
            </p>
            <p>
              <strong>Category:</strong> {categoryName}
            </p>
            <p>
              <strong>Description:</strong> {formData.description}{" "}
              {/* Sử dụng mô tả sản phẩm từ formData */}
            </p>
            <p>
              <strong>Price:</strong> {formData.price} VND
            </p>
            <p>
              <strong>Campus:</strong> {campusName}
            </p>
            <p>
              <strong>Duration:</strong> {formData.duration}
            </p>
            <p>
              <strong>Phone Number:</strong> {formData.phone}
            </p>
          </div>
        </div>
        <div className="qr-code-container">
          <QRCode value="https://your-payment-url.com" size={200} />
        </div>
        <div className="confirm-payment-button-container">
          <Button type="primary" onClick={handlePaymentSuccess}>
            Confirm Payment
          </Button>
        </div>
        <div className="countdown-container">
          <p>Time remaining: {countdown} seconds</p>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
