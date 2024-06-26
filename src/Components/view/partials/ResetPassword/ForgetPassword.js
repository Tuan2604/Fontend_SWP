import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css'; // Import your CSS file

const { Title } = Typography;

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email } = values;
    try {
      const response = await axios.post('https://localhost:7071/api/otp-management/send', {
        email,
        subject: 'Your OTP for Password Reset'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });

      console.log('Response:', response.data);
      toast.success('OTP sent to your email', {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        className: 'custom-toast',
      });
      navigate('/otp-verification', { state: { email } });
    } catch (error) {
      if (error.response) {
        // Handle error responses
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        toast.error(`Error: ${error.response.data.message || error.response.status}`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: 'custom-toast',
        });
      } else if (error.request) {
        // Handle no response error
        console.error('Request data:', error.request);
        toast.error('No response received from server', {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: 'custom-toast',
        });
      } else {
        // Handle other errors
        console.error('Error message:', error.message);
        toast.error(`Error: ${error.message}`, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: 'custom-toast',
        });
      }
    }
  };

  return (
    <div className="forget-password-container">
      <img src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png" alt="logo-form" />
      <Title level={3}>Forget Password</Title>
      <Form
        name="forget_password"
        className="forget-password-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="forget-password-form-button">
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;
