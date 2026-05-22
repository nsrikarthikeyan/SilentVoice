import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ 
  children, 
  allowedRole 
}) {
  const { user, userData } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userData?.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}