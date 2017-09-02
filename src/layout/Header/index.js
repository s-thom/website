import React from 'react';
import Link from '@phenomic/plugin-renderer-react/lib/components/Link';

import styles from './index.css';

const Header = () => (
  <header className={ styles.header }>
    <nav className={ styles.nav }>
      <Link className={ styles.link } to="/">
        <div className={ styles.meContainer }>
          <img className={ styles.meImg } src="/assets/img/me.jpg" />
        </div>
        <div className={ styles.navPart1 }>
            <h1 className={ styles.title }>Stuart Thomson</h1>
        </div>
      </Link>
    </nav>
  </header>
);

export default Header;
