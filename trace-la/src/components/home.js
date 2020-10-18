import React from 'react';
import '../styles/layout.css'
import { HashLink as Link } from 'react-router-hash-link';

function home() {
  return (
    <div className="body">
        <div className="login">
            <form className="login_form">
                <h1 style={{color: "#0d4968"}}>Login to TraceLA</h1>
                <label>Username or ID Number:</label>
                <input className="input"></input>
                <label>Password:</label>
                <input className="input"></input>
                <Link to="Dashboard"><button type="submit" className="submit_button">Login</button></Link>
            </form>
        </div>
    </div>
  );
}

export default home;