import React from 'react';
import { Navigate } from "react-router-dom";
import Navbar from './Navbar';

const ProtectRoute = ({ children, allowShop }) => {
  const token = window.localStorage.getItem('token');
  const role = window.localStorage.getItem('role');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is 'Shop' and access is not allowed, redirect to orders
  if (role === "Shop" && !allowShop) {
    return <Navigate to="/orders" replace />;
  }

  // Otherwise, render the child components (Dashboard or Orders)
  return (
    <>
      <Navbar /> {/* Render Navbar before children */}
      {children}
    </>
  );
}

export default ProtectRoute;
