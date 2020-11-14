import React from 'react';
import '../styles/layout.css'
import '../styles/button.css'
import { HashLink as Link } from "react-router-hash-link";

function dashboard() {
  return (
    <div className="body">
        <p>
            yay you logged in! / temp dashboard (i might make this home page and move all of 
            current home page content into a login.js file)

            input a coordinate to show a heatmap
            
      <h1 style={{ color: "white", marginBottom: "50px" }}>resources page</h1>
      <Link to="heatmap">
        <button className="resourcebtn">Heatmap</button>
      </Link>
        </p>
    </div>
  );
}

export default dashboard;
