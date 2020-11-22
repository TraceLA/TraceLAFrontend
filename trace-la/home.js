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
  }

  verifySignUp() {
    const emailRegex = /(.*(@g.ucla.edu))|(.*(@ucla.edu))/;
    var email = document.getElementById("email").value;
    var pass_1 = document.getElementById("password_1").value;
    var pass_2 = document.getElementById("password_2").value;
    var uid = document.getElementById("id").value;
    var modal = document.getElementById("myModal");
    if (/^\d+$/.test(uid) && uid.length == 9)
    {
      if (emailRegex.test(email))
      {
        if (pass_1 != "" && pass_1 == pass_2)
        {
          modal.style.display = "none";
        }
        else
        {
          alert("Please make sure your passwords match.");
        }
      }
      else
      {
        console.log(email);
        alert("Please make sure you enter a correct ucla email first.");
      }
    }
    else
    {
      alert("Please make sure your UID consists of only 9 digit numbers.")
    }
  }

  render() {
    return (
      <div className="body">
        <div className="sign_up">
          <button
            className="submit_button"
            style={{ color: "white", backgroundColor: "#0d4968" }}
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
                // textDecoration: "underline",
                marginBottom: "32px",
              }}
            >
              Log in to TraceLA
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

        <div className="modal" id="myModal">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ borderBottom: "1px solid white", paddingTop: "0px" }}
            >
              <button className="close-modal">&times;</button>
            </div>
            <div className="modal-body">
              <div
                className="form_container"
                style={{ backgroundColor: "#1295D8" }}
              >
                <form className="form">
                  <h1
                    style={{
                      color: "#FFB511",
                      marginBottom: "32px",
                    }}
                  >
                    Sign Up
                  </h1>
                  <label>Username:</label>
                  <input className="input" required></input>
                  <label>UID:</label>
                  <input className="input" maxLength="9" required id="id"></input>
                  <label>School Email (must have @g.ucla.edu or @ucla.edu):</label>
                  <input className="input" id="email" required></input>
                  <label>First Name:</label>
                  <input className="input" required></input>
                  <label>Last Name:</label>
                  <input className="input" required></input>
                  <label>Password:</label>
                  <input className="input" type="password" id="password_1" required></input>
                  <label>Retype Password:</label>
                  <input className="input" type="password" id="password_2" required></input>
                    <button
                      className="submit_button"
                      onClick={()=>{this.verifySignUp()}}
                      style={{ backgroundColor: "#FFB511" }}
                    >
                      Login
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
