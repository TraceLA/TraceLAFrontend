import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/main";
import Header from "./components/header";
import { HashRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Main />
      </HashRouter>
    </div>
  );
}

export default App;
