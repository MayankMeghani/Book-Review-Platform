// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
// ProtectedRoute checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    toast.error("Authentication Required.");
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the children if authenticated
};

export default ProtectedRoute;
