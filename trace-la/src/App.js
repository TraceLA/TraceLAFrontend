import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import MakeReport from './screens/MakeReport';
import LogInOrSignUp from './screens/LogInOrSignUp';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <a href="http://localhost:3000/"> Home Page</a>
          <a href="http://localhost:3000/MakeReport"> Make Report</a>
          <a href="http://localhost:3000/LogInOrSignUp"> LogIn/SignUp</a>
        </header>
        <body className="App-body">
          <h1>
            Trace LA Begins!
          </h1>
          <div className="Content">
            <Route path="/" exact={true} component={HomeScreen}/>
            <Route path="/MakeReport" exact={true} component={MakeReport}/>
            <Route path="/LogInOrSignUp" exact={true} component={LogInOrSignUp}/>
          </div>
        </body>
        <footer className="App-footer">
          <a
            className="App-link"
            href="https://www.creativelabsucla.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit CreativeLabs/TraceLA for more information
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
