import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, WechatOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Register.css";
import { useAuth } from "../../Hook/useAuth";

const { Title } = Typography;

const Register = () => {
  const { isLogin } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { fullname, email, phoneNumber } = values;
    try {
      const response = await axios.post(
        "https://localhost:7071/api/authentication/register",
        {
          fullname: fullname,
          email: email,
          phoneNumber: phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // This header is usually set by the server, not the client
          },
        }
      );

      // Handle the response as needed
      console.log("Response:", response.data);

      if (response.status === 200) {
        toast.success("Registration successful. Please login.", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
        setSuccess("Registration successful. Please login.");
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Bad Request: Please check your input fields.", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
      } else {
        toast.error(error.message, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
      }
      setError(error.message);
    }
  };
  useEffect(() => {
    if (isLogin) navigate("/");
  }, [isLogin, navigate]);

  if (isLogin) return null;

  return (
    <div className="register-container">
      <img
        src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png"
        alt="logo-form"
      />
      <Title level={3}>Register</Title>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <Form name="register" className="register-form" onFinish={onFinish}>
        <Form.Item
          name="fullname"
          rules={[
            { required: true, message: "Please input your Full Name!" },
            {
              pattern: /^[a-zA-Z0-9\s]{5,30}$/,
              message:
                "Full Name must be 5-30 characters long and not contain special characters",
            },
          ]}
        >
          <Input placeholder="Full Name" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email address!" },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/,
              message:
                "Email must be a valid FPT email address (ending with @fpt.edu.vn)",
            },
          ]}
        >
          <Input placeholder="Email" prefix={<WechatOutlined />} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your Phone number!" },
            {
              pattern: /^0[0-9]{9}$/,
              message: "Phone number must start with 0 and be 10 digits long",
            },
          ]}
        >
          <Input placeholder="Phone Number" prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
