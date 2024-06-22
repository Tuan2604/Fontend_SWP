import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./Components/view/partials/HomePage/Home";
import Login from "./Components/Login/Login";
import Header from "./Components/view/partials//HomePage/Header";
import Register from "./Components/view/Register/Register";
import "./transitions.css"; // Import the transitions CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./Components/view/partials/ResetPassword/ForgetPassword";
import OTPVerification from "./Components/view/partials/ResetPassword/OTPVerification";
import ResetPassword from "./Components/view/partials/ResetPassword/ResetPassword";
import PostCreate from "./Components/view/partials/PostNews/PostCreate";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    // Perform login logic here...
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here...
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <ToastContainer position="top-right" autoClose={3000} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            {/* Pass onLogin function to the Login component */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/PostNews/PostCreate.js" element={<PostCreate />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />{" "}
            {/* Catch-all route */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
