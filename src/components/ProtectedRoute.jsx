import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false, redirectTo = '/login' }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slt-blue-600"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If admin role is required but user is not admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is authenticated but trying to access auth pages, redirect to dashboard
  if (!requireAuth && isAuthenticated() && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;