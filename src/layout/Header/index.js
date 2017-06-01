import React from 'react';
import {Link} from 'phenomic';

import styles from './index.css';

const Header = () => (
  <header className={ styles.header }>
    <nav className={ styles.nav }>
      <div className={ styles.navPart1 }>
        <Link className={ styles.link } to="/">
          <h1 className={ styles.title }>Stuart Thomson</h1>
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
