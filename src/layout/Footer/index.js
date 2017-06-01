import React from 'react';
import {Link} from 'phenomic';
import Svg from 'react-svg-inline';

import meta from '../../metadata';
const pkg = meta.pkg;
import svgEmail from '../../include/email.svg';
import svgGithub from '../../include/github.svg';
import svgPhenomic from '../../include/phenomic.svg';
import svgTwitter from '../../include/twitter.svg';

import styles from './index.css';

const Footer = () => (
  <footer className={ styles.footer }>
    <p className={ styles.footerText }>
      <span className={styles.fade}>This site is WIP</span>
      <span className={styles.fade}>|</span>
      <Link to='mailto:stu.thom.96@gmail.com'><Svg svg={svgEmail} className={styles.svg} cleanup /></Link>
      <Link to={`https://github.com/${pkg.github}`}><Svg svg={svgGithub} className={styles.svg} cleanup /></Link>
      <span className={styles.fade}>|</span>
      <Link to='https://phenomic.io'><Svg svg={svgPhenomic} className={styles.svg} cleanup /></Link>
    </p>
  </footer>
);

export default Footer;
