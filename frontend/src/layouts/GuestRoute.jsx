import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/ui/Loader';

export const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullPage variant="cyber" text="INITIALIZING GUEST PORTAL..." />;
  }

  if (isAuthenticated) {
    const destination = location.state?.from?.pathname || '/overview';
    return <Navigate to={destination} replace />;
  }

  return children ? children : <Outlet />;
};
