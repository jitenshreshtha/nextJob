import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(user.accountType)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
