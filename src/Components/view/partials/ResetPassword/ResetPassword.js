import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./ResetPassword.css";

const { Title } = Typography;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleSubmit = async (values) => {
    const { newPassword, confirmPassword } = values;
    try {
      const response = await axios.post(
        "https://localhost:7071/api/authentication/password/reset",
        {
          email,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successful", {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: "custom-toast",
        });
        navigate("/login");
      } else {
        throw new Error("Password reset failed");
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
    <div className="reset-password-container">
      <img
        src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png"
        alt="logo-form"
      />
      <Title level={3}>Reset Password</Title>
      <Form
        name="reset_password"
        className="reset-password-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message:
                "Password must be at least 8 characters long and include at least one uppercase letter and one lowercase letter.",
            },
          ]}
        >
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            {
              validator(_, value) {
                if (!value || value === newPassword) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="reset-password-form-button"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
