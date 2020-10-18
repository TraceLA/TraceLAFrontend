import React from 'react';
import '../styles/header-footer.css'

function footer() {
  return (
    <div>
      <div className="footer" style={{width: '100vw'}}>
        <a
          className="link"
          href="https://www.creativelabsucla.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit CreativeLabs/TraceLA for more information
        </a>
      </div>
    </div>
  );
}

export default footer;
