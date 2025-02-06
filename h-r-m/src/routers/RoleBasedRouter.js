// src/components/RoleBasedRouter.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppRouters from './employeeRouter';
import HrmRouters from './hrmRouter';
import AdminRoutes from './adminRouter';

const RoleBasedRouter = () => {
  const { user } = useAuth();

  // If not authenticated, redirect to the login page
  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render routes based on the user's role
  switch (user.role) {
    case 'admin':
      return <AdminRoutes />;
    case 'employee':
      return <AppRouters />;
    case 'hr':
      return <HrmRouters />;
    default:
      return <Navigate to="/login" />;
  }
};

export default RoleBasedRouter;
