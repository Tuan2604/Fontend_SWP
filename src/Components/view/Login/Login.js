import React, { useState, useEffect } from "react"; // Import useEffect from react
import { Form, Input, Button, Typography } from "antd";
import { WechatOutlined, LockOutlined } from "@ant-design/icons";
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Add useEffect here
    setValue(localStorage.getItem("email"));
  }, []);

  const onFinish = (values) => {
    const { username, password } = values;
    if (username === "admin" && password === "password") {
      toast.success("Login successful", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false, // Remove close button
        className: "custom-toast", // Optional: Add a custom class for additional styling
      });
    } else {
      toast.error("Invalid username or password", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false, // Remove close button
        className: "custom-toast", // Optional: Add a custom class for additional styling
      });
      setError("Invalid username or password");
    }
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        toast.success("Login successful", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false, // Remove close button
          className: "custom-toast", // Optional: Add a custom class for additional styling
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false, // Remove close button
          className: "custom-toast", // Optional: Add a custom class for additional styling
        });
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <img
        src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png"
        alt="logo-form"
      />
      <Title level={3}>Login</Title>
      {error && <p className="error">{error}</p>}
      {value ? (
        <Home />
      ) : (
        <Form
          name="login_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<WechatOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
          <Form.Item>
            <Button
              type="default"
              onClick={handleSignInWithGoogle}
              className="google-signin-button"
            >
              Sign in with Google
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            Don't have an account? <Link to="/register">Register now</Link>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Login;
