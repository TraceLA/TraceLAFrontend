import React from "react";
import "../styles/header-footer.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <div style={{ width: "100vw" }}>
      <Navbar expand="md" className="header">
        <Navbar.Brand>
          <a href="/" className="header_link" style={{ fontSize: "28px" }}>
            Home
          </a>
          <a href="/#/usertable" className="header_link" style={{ fontSize: "28px" }}>
           Users
          </a>
          <a href="/#/contactstable" className="header_link" style={{ fontSize: "28px" }}>
           Contacts
          </a>
          <a href="/#/resultstable" className="header_link" style={{ fontSize: "28px" }}>
           Test Results
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </div>
  );
};

export default Header;
