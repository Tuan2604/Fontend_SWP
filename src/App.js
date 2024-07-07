import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Components/Login/Login";
import UserManagementPage from "./Components/admin/View/UserManagement/UserManagement";
import CampusManagementPage from "./Components/admin/View/CampusManagementPage/CampusManagementPage";
import Register from "./Components/view/Register/Register";
import Header from "./Components/view/partials/HomePage/Header";
import Home from "./Components/view/partials/HomePage/Home";
import PostCreate from "./Components/view/partials/CreatePostNews/PostCreate";
import ForgetPassword from "./Components/view/partials/ResetPassword/ForgetPassword";
import OTPVerification from "./Components/view/partials/ResetPassword/OTPVerification";
import ResetPassword from "./Components/view/partials/ResetPassword/ResetPassword";
import Account from "./Components/view/account/account";
import ItemDetail from "./Components/view/partials/ViewDetail/ItemDetail";
import ChatPage from "./Components/view/Chat/Chat";
import Payment from "./Components/view/Payment/Payment";
import PaySuccess from "./Components/view/Payment/PaySuccess"; // Import PaySuccess component
import "./transitions.css";

import { useAuth } from "./Components/Hook/useAuth";

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const { isLogin, userInformation } = useAuth();
  const [showHeader, setShowHeader] = useState(true);

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
            <Route path="/account" element={<Account />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route
              path="/chat/:itemId"
              element={<ChatPage setShowHeader={setShowHeader} />}
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaySuccess />} />
            <Route
              path="/admin"
              element={
                isLoggedIn ? (
                  <Navigate to="/admin/user-management" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/user-management"
              element={
                isLoggedIn ? (
                  <UserManagementPage setShowHeader={setShowHeader} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin/campus-management"
              element={
                isLoggedIn ? (
                  <CampusManagementPage setShowHeader={setShowHeader} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
