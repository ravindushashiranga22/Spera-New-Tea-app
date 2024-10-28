import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Import your logo (adjust the path based on where the logo is stored)
import logo from "../pages/login/new logo.png";
import ordericon from "./shopping-cart_4824141.png";
import logouticon from "./logout_12080248.png";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="p-0 bg-white rounded">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="Tea App Logo"
            height="90rem"
            className="d-inline-block align-center"
          />
          {/* Tea App */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {" "}
            {/* Align Orders and Log Out to the right */}
            {location.pathname !== "/orders" && (
              <Nav.Link href="/orders"> <img
              src={ordericon}
              alt="Order_Icon"
              height="30rem"
              className="d-inline-block align-center"
            />Orders</Nav.Link>
            )}
            <Nav.Link href="#" onClick={handleLogout}>
            <img
              src={logouticon}
              alt="logout_Icon"
              height="30rem"
              className="d-inline-block align-center"
            /> Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
