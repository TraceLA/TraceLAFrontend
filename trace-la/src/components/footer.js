import React from 'react';
import '../styles/header-footer.css'

function footer() {
  return (
    <div>
      <div className="footer" style={{width: '100vw'}}>
        <div className="footer_body">
          <a
            className="link"
            href="https://www.creativelabsucla.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit CreativeLabs/TraceLA for more information
          </a>
          <a className="link" href="#terms-of-service">Terms of Service</a>
          <a className="link" href="#contact">Contact Information</a>
        </div>
      </div>
    </div>
  );
}

export default footer;
