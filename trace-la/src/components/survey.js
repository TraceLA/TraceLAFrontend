import React from 'react';
import '../styles/layout.css'
import { HashLink as Link } from 'react-router-hash-link';

function survey() {
  return (
    <div className="body">
        <div className="form_container">
            <form className="form">
                <h1 style={{color: "#0d4968", textDecoration: 'underline', marginBottom: '32px'}}>Report Covid Survey</h1>
                <label>Username or UID:</label>
                <input className="input"></input>
                <br></br>
                <label>First Name:</label>
                <input className="input"></input>
                <br></br>
                <label>Last Name:</label>
                <input className="input"></input>
                <br></br>
                <label>Locations Visited (Coordinates):</label>
                <textarea className="textarea"></textarea>
                <br></br>
                {/* <label>List of Symptoms: (Cough, Fever, etc.)</label>
                <br></br>
                <textarea className="textarea"></textarea>
                <br></br>
                <label>Locations Visited: (Place 1, Place 2, etc.)</label>
                <br></br>
                <textarea className="textarea"></textarea>
                <br></br>
                <label>People contacted: (First, Last; First, Last; etc.)</label>
                <br></br>
                <textarea className="textarea"></textarea>*/}
                <br></br>
                <Link to="Heatmap"><button type="submit" className="submit_button">Submit</button></Link>
            </form>
        </div>
    </div>
  );
}

export default survey;
