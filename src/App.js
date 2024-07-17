import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./Components/Login/Login";
import UserManagementPage from "./Components/admin/View/UserManagement/UserManagement";
import CampusManagementPage from "./Components/admin/View/CampusManagementPage/CampusManagementPage";
import Register from "./Components/view/Register/Register";
import Header from "./Components/view/partials/Header/Header";
import Home from "./Components/view/partials/HomePage/Home";
import PostCreate from "./Components/view/partials/CreatePostNews/PostCreate";
import ForgetPassword from "./Components/view/partials/ResetPassword/ForgetPassword";
import OTPVerification from "./Components/view/partials/ResetPassword/OTPVerification";
import ResetPassword from "./Components/view/partials/ResetPassword/ResetPassword";
import Account from "./Components/view/account/account";
import ItemDetail from "./Components/view/partials/ViewDetail/ItemDetail";
import ChatPage from "./Components/view/Chat/Chat";
import Payment from "./Components/view/Payment/Payment";
import PaySuccess from "./Components/view/Payment/PaySuccess";
import CategoryManagementPage from "./Components/admin/View/Category/Category";
import PayFail from "./Components/view/Payment/Payfail";
import ProductPostList from "./Components/Moderator/view/BrowserPost/ProductPostList";
import ListBuyer from "./Components/view/ListBuyer/ListBuyer";
import PurchasedList from "./Components/view/purchased list/Purchased list";
import Dashboard from "./Components/admin/View/Dashboard/Dashboard";
import SellerPosts from "./Components/view/ListSeller/ListSeller";
import BuyerHistory from "./Components/view/Buyer History/BuyerHistory";
import BuyerSuccess from "./Components/view/Buy Successfull/BuySuccess";

import "./transitions.css";
import { useAuth } from "./Components/Hook/useAuth";
import SellerPostsHis from "./Components/view/Seller history/Seller history";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard2 from "./Components/Moderator/view/DashBoard/DashboardModer";

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

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setShowHeader(!["login", "register", "moderator"].includes(path));
  }, [location]);

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
            <Route path="/payment/payment-success" element={<PaySuccess />} />
            <Route path="/payment/payfail" element={<PayFail />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Navigate to="/admin/user-management" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user-management"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <UserManagementPage setShowHeader={setShowHeader} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/campus-management"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <CampusManagementPage setShowHeader={setShowHeader} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/category-management"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <CategoryManagementPage setShowHeader={setShowHeader} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Admin"]}>
                  <Dashboard setShowHeader={setShowHeader} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/moderator"
              element={
                <ProtectedRoute allowedRoles={["Moderator"]}>
                  <Navigate to="/moderator/browser-post" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/moderator/browser-post"
              element={
                <ProtectedRoute allowedRoles={["Moderator"]}>
                  <ProductPostList setShowHeader={setShowHeader} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/moderator/dashboard2"
              element={
                <ProtectedRoute allowedRoles={["Moderator"]}>
                  <Dashboard2 setShowHeader={setShowHeader} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/buyer-history/:postId"
              element={<BuyerHistory />} // Route for buyer history
            />
            <Route path="/buyer-success" element={<BuyerSuccess />} />
            <Route path="/seller-history" element={<SellerPostsHis />} />
            <Route path="/list-seller" element={<SellerPosts />} />
            <Route path="/buyer-details/:postId" element={<ListBuyer />} />{" "}
            {/* Add route for buyer details */}
            <Route path="/purchased-list" element={<PurchasedList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
