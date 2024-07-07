import React from "react";
import { Card, Button } from "antd";
import QRCode from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css"; // Import custom CSS

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state;

  // Example MoMo payment URL, replace with your actual URL
  const momoPaymentUrl = "https://momo.vn/payment?amount=100000&orderId=123456";

  const handleConfirmPayment = () => {
    console.log("Payment confirmed!");
    navigate("/payment-success"); // Navigate to success page
  };

  // Format price with VNĐ suffix
  const formatPrice = (price) => {
    return `${price.toLocaleString()} VNĐ`;
  };

  return (
    <Card title="Payment Information" className="payment-card">
      <div className="payment-info-container">
        {formData.image && (
          <div className="payment-image-container">
            <img src={formData.image} alt="Post" className="payment-image" />
          </div>
        )}
        <div className="payment-info">
          <p>
            <strong>Tên người đăng:</strong> {formData.fullname}
          </p>
          <p>
            <strong>Tên sản phẩm:</strong> {formData.productName}
          </p>
          <p>
            <strong>Danh mục:</strong> {formData.category}
          </p>
          <p>
            <strong>Giá tiền:</strong> {formatPrice(formData.price)}
          </p>
          <p>
            <strong>Campus:</strong> {formData.campus}
          </p>
          <p>
            <strong>Số điện thoại liên hệ:</strong> {formData.phone}
          </p>
          <p>
            <strong>Thời gian đăng bài:</strong> {formData.duration}
          </p>
          <div className="qr-code-container">
            <QRCode value={momoPaymentUrl} size={128} />
          </div>
          <div className="confirm-payment-button-container">
            <Button type="primary" onClick={handleConfirmPayment}>
              Xác nhận thanh toán
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Payment;
