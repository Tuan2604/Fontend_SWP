import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./OTPVerification.css";

const { Title } = Typography;

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleSubmit = async (values) => {
    const { otp } = values;
    try {
      const response = await axios.post(
        "https://localhost:7071/api/otp-management/verify",
        {
          email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("OTP verified", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
        navigate("/reset-password", { state: { email } });
      } else {
        throw new Error("OTP verification failed");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || error.response.status}`,
          {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            className: "custom-toast",
          }
        );
      } else if (error.request) {
        toast.error("No response received from server", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
      } else {
        toast.error(`Error: ${error.message}`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
      }
    }
  };

  return (
    <div className="otp-verification-container">
      <img
        src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png"
        alt="logo-form"
      />
      <Title level={3}>OTP Verification</Title>
      <Form
        name="otp_verification"
        className="otp-verification-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="otp"
          rules={[{ required: true, message: "Please input your OTP!" }]}
        >
          <Input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="otp-verification-form-button"
          >
            Verify OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OTPVerification;
