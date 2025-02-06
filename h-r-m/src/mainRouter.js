import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Import AuthProvider once
import RoleBasedRouter from './routers/RoleBasedRouter';  // Import RoleBasedRouter
import Login from './Login';  // Import the Login page
import ProtectedRoute from './routers/protectedRoute';
const MainRouter = () => {
  return (
    <AuthProvider>  {/* Wrap your MainRouter in AuthProvider to provide auth state */}
      <Router>  {/* Set up routing */}
        <Routes>
          <Route path="/login" element={<Login />} />  {/* Login page route */}
          <Route path="/*" element={ <ProtectedRoute>
            <RoleBasedRouter />  {/* Role-based routing */}
          </ProtectedRoute>} />  {/* Protected route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default MainRouter;
