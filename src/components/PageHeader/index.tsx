import React from 'react';

import Link from '../Link';

import './index.css';

const Header = () => (
  <header className="PageHeader">
    <nav className="PageHeader-nav">
      <Link className="PageHeader-link" to="/">
        <div className="PageHeader-me">
          <img 
            className="PageHeader-meImg" 
            src="/assets/img/me.jpg" 
            alt="Portrait of Stuart Thomson" 
          />
        </div>
        <div className="PageHeader-navPart1">
          <h1 className="PageHeader-title">Stuart Thomson</h1>
        </div>
      </Link>
    </nav>
  </header>
);

export default Header;
