// src/Components/view/Register/Register.js
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, WechatOutlined, PhoneOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Register.css";

const { Title } = Typography;

const Register = () => {
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
        toast.success("Registration successful.Please login.", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
        setSuccess("Registration successful.Please login.");
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

    return (
        <div className="register-container">
            <img src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png" alt="logo-form" />
            <Title level={3}>Register</Title>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <Form name="register" className="register-form" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input placeholder="Username" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                            type: 'email',
                        },
                    ]}
                >
                    <Input placeholder="Email" prefix={<WechatOutlined />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    hasFeedback
                >
                    <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" prefix={<LockOutlined />} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login here</Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
