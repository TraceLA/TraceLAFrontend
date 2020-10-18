import React from 'react';
import '../styles/header-footer.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

function header() {
  return (
    <div style={{width: '100vw'}}>
    <Navbar expand="md" className="header">
    <Navbar.Brand><a href="/" className="header_link" style={{fontSize: '28px'}}>Home</a></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="nav_auto">
        <Nav.Link><a className="header_link">page1</a></Nav.Link>
        <Nav.Link><a className="header_link">page2</a></Nav.Link>
        {/*<NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>*/}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    </div>
  );
}

export default header;
