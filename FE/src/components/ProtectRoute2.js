import { Navigate } from "react-router-dom";

const ProtectRoute2 = ({ children }) => {
  const token = window.localStorage.getItem('token');
  const role = window.localStorage.getItem('role');

  // If a user is logged in (has a token), redirect based on their role
  if (token) {
    if (role === "shop") {
      return <Navigate to="/orders" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If no token, allow access to the login or register page
  return children;
}

export default ProtectRoute2;
