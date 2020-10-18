import React from 'react';

import Main from './components/main';
import Footer from './components/footer';
import Header from './components/header';
import Navbar from './components/navbar';
import {HashRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <Header/>
        <Main/>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
