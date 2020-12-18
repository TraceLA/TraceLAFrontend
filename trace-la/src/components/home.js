import React from "react";
import "../styles/layout.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LoginButton = () => {
  const history = useHistory();
  const login = async (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPw").value;
    const params = {
      username,
      password,
    };
    try {
      const res = await axios.post("/userLogin", null, { params });
      window.localStorage.setItem("apikey", res.data.api_key);
      history.push("/heatmap");
    } catch (err) {
      // TODO: add helper text based on the error from response
      console.error(err.response.data);
    }
  };

  return (
    <button type="submit" className="submit_button" onClick={login}>
      Login
    </button>
  );
};

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

  async verifySignUp() {
    const emailRegex = /(.*(@g.ucla.edu))|(.*(@ucla.edu))/;
    var email = document.getElementById("email").value;
    var pass_1 = document.getElementById("password_1").value;
    var pass_2 = document.getElementById("password_2").value;
    var uid = document.getElementById("id").value;
    var modal = document.getElementById("myModal");
    let first_name = document.getElementById("f_name").value;
    let last_name = document.getElementById("l_name").value;
    let username = document.getElementById("username").value;

    if (/^\d+$/.test(uid) && uid.length === 9) {
      if (emailRegex.test(email)) {
        if (pass_1 !== "" && pass_1 === pass_2) {
          modal.style.display = "none";
        } else {
          alert("Please make sure your passwords match.");
          return;
        }
      } else {
        console.log(email);
        alert("Please make sure you enter a correct ucla email first.");
        return;
      }
    } else {
      alert("Please make sure your UID consists of only 9 digit numbers.");
      return;
    }
    const params = {
      first_name,
      last_name,
      username,
      email,
      password: pass_1,
      studentid: uid,
    };
    try {
      await axios.post("/users", null, { params });
    } catch (err) {
      // TODO: add helper text based on the error from response
      console.error(err.response.data);
    }
  }

  render() {
    return (
      <div className="body">
        <div className="form_container">
          <form className="form">
            <label>Username:</label>
            <input className="input" id="loginUser"></input>
            <label>Password:</label>
            <input className="input" id="loginPw" type="password"></input>

            <LoginButton>Login</LoginButton>
          </form>
        </div>
        <div className="sign_up">
          <button
            className="submit_button"
            onClick={() => this.openModal()}
          >
            Sign Up
          </button>
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
                style={{ backgroundColor: "#FFB511 " }}
              >
                <form className="form">
                  <label>Username:</label>
                  <input className="input" required id="username"></input>
                  <label>UID:</label>
                  <input
                    className="input"
                    maxLength="9"
                    required
                    id="id"
                  ></input>
                  <label>
                    UCLA Email:
                  </label>
                  <input className="input" id="email" required></input>
                  <label>First Name:</label>
                  <input className="input" required id="f_name"></input>
                  <label>Last Name:</label>
                  <input className="input" required id="l_name"></input>
                  <label>Password:</label>
                  <input
                    className="input"
                    type="password"
                    id="password_1"
                    required
                  ></input>
                  <label>Retype Password:</label>
                  <input
                    className="input"
                    type="password"
                    id="password_2"
                    required
                  ></input>
                  <button
                    className="submit_button"
                    onClick={() => {
                      this.verifySignUp();
                    }}
                    style={{ backgroundColor: "0d4968" }}
                  >
                    Sign Up
                    {/* #0d4968; */}
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
