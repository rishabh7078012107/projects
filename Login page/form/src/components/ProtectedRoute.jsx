import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;