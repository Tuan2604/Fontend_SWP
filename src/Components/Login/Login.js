import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography } from "antd";
import { WechatOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Login.css"; // Import CSS file specific to the login page
import { useAuth } from "../Hook/useAuth";

const { Title } = Typography;

const Login = ({ onLogin }) => {
  const { setIsLogin, isLogin, setUserInformation, userInformation } =
    useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const response = await axios.post(
        "https://localhost:7071/api/authentication/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.data.accessToken) {
        toast.success("Login successful", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });

        // Store user data in localStorage
        localStorage.setItem("email", response.data.userInfo.email);
        localStorage.setItem("fullname", response.data.userInfo.fullname);
        localStorage.setItem("role", response.data.userInfo.role);
        localStorage.setItem("phoneNumber", response.data.userInfo.phoneNumber);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);

        setUserInformation(response.data);
        setIsLogin(true);
      } else {
        throw new Error(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        className: "custom-toast",
      });
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isLogin) {
      if (userInformation) {
        // Redirect if already logged in
        if (userInformation?.userInfo?.role === "Admin") {
          navigate("/admin");
        } else if (userInformation?.userInfo?.role === "Moderator") {
          navigate("/moderator");
        } else {
          navigate("/");
        }
      }
    }
  }, [isLogin, navigate, userInformation]);

  if (isLogin) return null;

  return (
    <div className="login-page">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="login-container">
          <img
            src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png"
            alt="logo-form"
          />
          <Title level={3}>Login</Title>
          {error && <p className="error">{error}</p>}
          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email" }]}
            >
              <Input prefix={<WechatOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Link className="login-form-forgot" to="/forget-password">
                Forgot password?
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              Don't have an account? <Link to="/register">Register now</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
