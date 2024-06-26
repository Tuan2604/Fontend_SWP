// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  if (allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
