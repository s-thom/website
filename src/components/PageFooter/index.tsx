import React from 'react';
import Svg from 'react-svg-inline';

import Link from '../Link';

import svgEmail from '../../include/email.svg';
import svgGithub from '../../include/github.svg';

import './index.css';

export default function PageFooter() {
  return (
    <footer className="PageFooter">
      <p className="PageFooter-text">
        <span className="PageFooter-fade">Copyight &copy; Stuart Thomson</span>
        <span className="PageFooter-fade">|</span>
        <Link to="mailto:stu.thom.96@gmail.com">
          <Svg svg={svgEmail} className="PageFooter-svg" cleanup />
        </Link>
        <Link to="https://github.com/s-thom">
          <Svg svg={svgGithub} className="PageFooter-svg" cleanup />
        </Link>
      </p>
    </footer>
  );
}
