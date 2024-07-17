import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../src/Components/Hook/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLogin, userInformation } = useAuth();

  if (!isLogin) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userInformation.userInfo.role)) {
    // If the user does not have the required role, redirect to the 404 page
    return <Navigate to="/404" />;
  }

  // If the user is logged in and has the required role, render the children
  return children;
};

export default ProtectedRoute;
