import React from 'react';
import '../styles/layout.css'
import { HashLink as Link } from 'react-router-hash-link';

function home() {
  return (
    <div className="body">
        <div className="login">
            <form className="login_form">
                <h1>Login to TraceLA</h1>
                <label>Username or ID Number:</label>
                <input className="input"></input><br/>
                <label>Password:</label>
                <input className="input"></input><br/>
                <Link to="Dashboard"><button type="submit">Login</button></Link>
            </form>
        </div>
    </div>
  );
}

export default home;
