import React from "react";
import "../styles/layout.css";
import { HashLink as Link } from "react-router-hash-link";

export default class home extends React.Component {
  openModal() {
    // Set the modal text
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close-modal")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  render() {
    return (
      <div className="body">
        <div className="sign_up">
          <button
            className="submit_button"
            style={{ color: "white", backgroundColor: "#FFB511" }}
            onClick={() => this.openModal()}
          >
            Sign Up
          </button>
        </div>
        <div className="form_container">
          <form className="form">
            <h1
              style={{
                color: "#0d4968",
                textDecoration: "underline",
                marginBottom: "32px",
              }}
            >
              Login to TraceLA
            </h1>
            <label>Username or UID:</label>
            <input className="input"></input>
            <label>Password:</label>
            <input className="input"></input>
            <Link to="Dashboard">
              <button type="submit" className="submit_button">
                Login
              </button>
            </Link>
          </form>
        </div>

        <div class="modal" id="myModal">
          <div class="modal-content">
            <div
              class="modal-header"
              style={{ borderBottom: "1px solid white", paddingTop: "0px" }}
            >
              <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <div
                className="form_container"
                style={{ backgroundColor: "#1295D8" }}
              >
                <form className="form">
                  <h1
                    style={{
                      color: "#FFB511",
                      textDecoration: "underline",
                      marginBottom: "32px",
                    }}
                  >
                    Sign Up
                  </h1>
                  <label>Username:</label>
                  <input className="input"></input>
                  <label>UID:</label>
                  <input className="input"></input>
                  <label>First Name:</label>
                  <input className="input"></input>
                  <label>Last Name:</label>
                  <input className="input"></input>
                  <label>Password:</label>
                  <input className="input"></input>
                  <Link to="Dashboard">
                    <button
                      type="submit"
                      className="submit_button"
                      style={{ backgroundColor: "#FFB511" }}
                    >
                      Login
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
