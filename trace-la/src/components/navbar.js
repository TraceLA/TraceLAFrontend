import React from 'react';
import '../styles/header-footer.css';

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <a>Home Page</a>
        <a>Report Covid</a>
        <a className="sign-up">Sign Up</a>
      </div>
    </div>
  );
}

export default Navbar;
