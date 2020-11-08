import React from "react";
import "../styles/layout.css";
import "../styles/button.css";
import { HashLink as Link } from "react-router-hash-link";

const Resources = () => {
  return (
    <div className="body">
      <h1 style={{ color: "white", marginBottom: "50px" }}>resources page</h1>
      <Link to="heatmap">
        <button className="resourcebtn">Heatmap</button>
      </Link>
    </div>
  );
};

export default Resources;
