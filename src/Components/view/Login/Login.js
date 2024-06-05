// src/Components/view/Login/Login.js
// import React, { useEffect, useState } from 'react';
// import { auth, provider } from "./Firebase";  // Ensure correct import path
// import { signInWithPopup } from "firebase/auth";
// import Home from "./Home";  // Ensure this path is correct relative to your file structure
// import './Login.css';  // Import your CSS file for styling

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');  // Correct declaration use
//     const [value, setValue] = useState('');

//     useEffect(() => {
//         setValue(localStorage.getItem('email'));
//     }, []);

//     const handleLogin = (e) => {
//         e.preventDefault();
//         // For demonstration purposes, we'll just check if the fields are filled
//         if (username === 'admin' && password === 'password') {
//             alert('Login successful!');
//         } else {
//             setError('Invalid username or password');
//         }
//     };

//     const handleSignInWithGoogle = () => {
//         signInWithPopup(auth, provider).then((data) => {
//             setValue(data.user.email);
//             localStorage.setItem("email", data.user.email);
//         }).catch((error) => {
//             setError(error.message);
//         });
//     };

//     return (
//         <div className="login-container">  {/* Consistent class name */}
//          <img src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png" alt="logo-form" />
//             <h2>Login</h2>         
//             {error && <p className="error">{error}</p>}
//             {value ? (
//                 <Home />  // Render the Home component on login success
//             ) : (
//                 <div>
//                     <form onSubmit={handleLogin}>
//                         <div className="input-container">  {/* Consistent class name */}
//                             <label htmlFor="username">Username:</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="input-container">  {/* Consistent class name */}
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button type="submit">Login</button>
//                     </form>
//                     <button className="google-signin-button" onClick={handleSignInWithGoogle}>Sign in with Google</button>  {/* Specific class name */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Login  


// src/Components/view/Login/Login.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { WechatOutlined, LockOutlined } from '@ant-design/icons';
import { auth, provider } from "./Firebase";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import { Link } from 'react-router-dom';
import './Login.css';

const { Title } = Typography;

const Login = () => {
    const [error, setError] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(localStorage.getItem('email'));
    }, []);

    const onFinish = (values) => {
        const { username, password } = values;
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleSignInWithGoogle = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
        }).catch((error) => {
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
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<WechatOutlined />} placeholder="Username" />
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
