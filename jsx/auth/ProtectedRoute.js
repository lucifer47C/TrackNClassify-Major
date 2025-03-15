import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authState, loading } = useAuth();
  const userRole = authState.user?.role;

  useEffect(() => {
    if (authState.token && allowedRoles && !allowedRoles.includes(userRole)) {
      toast.error('You are not authorized to access this page.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [authState.token, allowedRoles, userRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authState.token) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
