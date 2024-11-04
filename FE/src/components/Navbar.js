import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../pages/login/logo.webp';
import { IoMdCart } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';

export default function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="py-2 px-5 bg-white fixed-top shadow-sm">
      <Container>
        <Navbar.Brand href="/dashboard">
          <img
            src={logo}
            alt="Tea App Logo"
            height="50"
            className="d-inline-block align-center"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto py-4 p-lg-0 gap-lg-5 gap-2">
            {location.pathname !== '/orders' && (
              <Nav.Link href="/orders" className="d-flex align-items-center">
                <IoMdCart className="text-black me-2 " />
                <span className="font-weight-bold">Orders</span>
              </Nav.Link>
            )}
            <Nav.Link
              href="#"
              onClick={handleLogout}
              className="d-flex align-items-center"
            >
              <MdLogout className="text-black me-2" />{' '}
              <span className="font-weight-bold">Log Out</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
