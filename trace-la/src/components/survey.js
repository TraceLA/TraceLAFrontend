import React from 'react';
import '../styles/layout.css'
import { HashLink as Link } from 'react-router-hash-link';

function survey() {
  return (
    <div className="body">
        <div className="survey">
            <form className="survey_form">
                <h1 style={{color: "#0d4968", textDecoration: 'underline', marginBottom: '32px'}}>Report Covid Survey</h1>
                <label>Username: </label>
                <input className="input"></input>
                <br></br>
                <label>First Name</label>
                <input className="input"></input>
                <br></br>
                <label>Last Name</label>
                <input className="input"></input>
                <br></br>
                <label>List of Symptoms: (Cough, Fever,)</label>
                <br></br>
                <input className="input"></input>
                <br></br>
                <label>Locations Visited: (Place 1, Place 2,)</label>
                <br></br>
                <input className="input"></input>
                <br></br>
                <label>People contacted: (First, Last; First, Last;)</label>
                <br></br>
                <input className="input"></input>
                <br></br>
                <Link to="Dashboard"><button type="submit" className="submit_button">Submit</button></Link>
            </form>
        </div>
    </div>
  );
}

export default survey;
