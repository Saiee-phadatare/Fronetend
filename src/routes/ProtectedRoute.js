import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) return <Navigate to="/admin-login" />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin-login" />;
    }
  } catch {
    return <Navigate to="/admin-login" />;
  }

  return children;
}

export default ProtectedRoute;
