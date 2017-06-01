import React, { PropTypes } from 'react';
import {Link} from 'phenomic';

import styles from './index.css';

const PageError = ({ error, errorText }) => (
  <div className={ styles.container }>
    <div className={ styles.oops }>{ '{uh_oh}' }</div>
    <div className={ styles.text }>
      <p className={ styles.title }>
        <strong>{ error }</strong>
        { ': ' }
        { errorText }
      </p>
      {
        error === 404 &&
        <div>
          { 'It seems you found a broken link. ' }
          { 'Sorry about that. ' }
          <br />
          { 'This error has been logged, and will be looked at.' },
          { 'You can try going back, or to the ' }
          <Link to="/">{ 'home page' }</Link>
          { '.' }
        </div>
      }
    </div>
  </div>
);

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
};

PageError.defaultProps = {
  error: 404,
  errorText: 'Page Not Found',
};

export default PageError;
