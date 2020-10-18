import React from 'react';
import '../styles/header-footer.css';

function header() {
  return (
    <div>
      <div className="header">
        <a href="/" className="header_link" style={{float: 'left', marginRight: 'auto'}}>
          Home
        </a>
      </div>
    </div>
  );
}

export default header;
