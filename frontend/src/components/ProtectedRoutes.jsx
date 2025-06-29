import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ role = null }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute rendered", { user, loading, role });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return (
      <div className="">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
