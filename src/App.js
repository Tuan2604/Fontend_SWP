// App.js
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Components/Login/Login";
import UserManagementPage from "./Components/admin/View/UserManagement/UserManagement";

import Register from "./Components/view/Register/Register";
import Header from "./Components/view/partials/HomePage/Header";
import Home from "./Components/view/partials/HomePage/Home";
import PostCreate from "./Components/view/partials/CreatePostNews/PostCreate";
import ForgetPassword from "./Components/view/partials/ResetPassword/ForgetPassword";
import OTPVerification from "./Components/view/partials/ResetPassword/OTPVerification";
import ResetPassword from "./Components/view/partials/ResetPassword/ResetPassword";
import Account from "./Components/view/account/account"; //
import "./transitions.css";

import { useAuth } from "./Components/Hook/useAuth";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const { isLogin, userInformation } = useAuth();
  const [showHeader, setShowHeader] = useState(true); // State to control header visibility

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {showHeader && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      {/* Conditional rendering of Header */}
      <ToastContainer position="top-right" autoClose={3000} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/post-create" element={<PostCreate />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register" element={<Account />} />

            <Route
              path="/admin"
              element={
                <UserManagementPage
                  isLoggedIn={isLoggedIn}
                  setShowHeader={setShowHeader}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route path="/account" element={<Account />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
