import React from "react";
import "../styles/header-footer.css";
import { Navbar} from "react-bootstrap";

const Header = () => {
  return (
    <div style={{ width: "100vw" }}>
      <Navbar expand="md" className="header">
        <Navbar.Brand>
          <a href="/" className="header_link" style={{ fontSize: "28px" }}>
            Home
          </a>
          <a href="/#/heatmap" className="header_link" style={{ fontSize: "28px" }}>
           Heatmap
          </a>
          <a href="/#/users" className="header_link" style={{ fontSize: "28px" }}>
           Users
          </a>
          <a href="/#/contacts" className="header_link" style={{ fontSize: "28px" }}>
           Contacts
          </a>
          <a href="/#/results" className="header_link" style={{ fontSize: "28px" }}>
           Results
          </a>
          <a href="/#/tags" className="header_link" style={{ fontSize: "28px" }}>
           Tags
          </a>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    </div>
  );
};

export default Header;
