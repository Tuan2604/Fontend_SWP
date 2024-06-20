import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { WechatOutlined, LockOutlined } from '@ant-design/icons';
import { auth, provider } from './Firebase';
import { signInWithPopup } from 'firebase/auth';
import Home from './Home';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';

const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);

  const onFinish = async (values) => {
    const { username, password } = values;
    try {
      const response = await axios.post('https://localhost:7071/api/authentication/login', 
        {
          email: username,
          password: password
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // This header is usually set by the server, not the client
          }
        }
      );
  
      // Handle the response as needed
      console.log('Response:', response.data);
  
      if (response.data.accessToken) {
        toast.success('Login successful', {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: 'custom-toast',
        });
        
        // Store tokens and user info in localStorage
        localStorage.setItem('email', response.data.userInfo.email);
        localStorage.setItem('fullname', response.data.userInfo.fullname);
        localStorage.setItem('role', response.data.userInfo.role);
        localStorage.setItem('phoneNumber', response.data.userInfo.phoneNumber);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
  
        setValue(response.data.userInfo.email);
        navigate('/');
      } else {
        throw new Error(response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        className: 'custom-toast',
      });
      setError(error.message);
    }
  };
  

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem('email', data.user.email);
        toast.success('Login successful', {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: 'custom-toast',
        });
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          className: 'custom-toast',
        });
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <img src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png" alt="logo-form" />
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
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<WechatOutlined />} placeholder="username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
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
            <Button type="primary" htmlType="submit" className="login-form-button">
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
          <Form.Item style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register now</Link>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Login;
