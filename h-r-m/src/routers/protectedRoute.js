// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is not authenticated, redirect to the login page
  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected route (children)
  return children;
};

export default ProtectedRoute;
