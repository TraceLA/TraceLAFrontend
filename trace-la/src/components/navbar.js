import React from 'react';
import '../styles/header-footer.css';

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <a href="/">Home Page</a>
        <a href="/report"> Report Covid</a>
        <a href="/signup" className="sign-up">Sign Up</a>
      </div>
    </div>
  );
}

export default Navbar;
