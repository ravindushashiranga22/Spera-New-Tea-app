
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Import your logo (adjust the path based on where the logo is stored)
import logo from '../pages/login/logo.webp';
import { FiLogOut } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';

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
    <Navbar expand="lg" className="bg-white rounded p-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="Tea App Logo"
            height="70"
            className="d-inline-block align-center"
            style={{ maxHeight: '40px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {location.pathname !== '/orders' && (
              <Nav.Link
                href="#/orders"
                className="d-flex align-items-center me-3 text-dark"
                style={{ fontSize: '1rem' }}
              >
                <IoCartOutline
                  className="me-1"
                  style={{ fontSize: '1.5rem' }}
                />
                Orders
              </Nav.Link>
            )}
            <Nav.Link
              href="#"
              onClick={handleLogout}
              className="d-flex align-items-center text-dark"
              style={{ fontSize: '1rem' }}
            >
              <FiLogOut className="me-1" style={{ fontSize: '1.5rem' }} />
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
