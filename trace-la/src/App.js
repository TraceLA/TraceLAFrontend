import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <p>
            Trace LA Begins!
          </p>
        </header>
        <body className="App-body">
          <div className="Content">
            <Route path="/" exact={true} component={HomeScreen}/>
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
