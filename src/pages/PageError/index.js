import React from 'react';
import PropTypes from 'prop-types';
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
          { 'This is where most websites would include a witty comment. Not this one.' }
          <Link to="/">{ 'home page' }</Link>
          { '.' }
        </div>
      }
    </div>
  </div>
);

// @ts-ignore
PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
};

// @ts-ignore
PageError.defaultProps = {
  error: 404,
  errorText: 'Page Not Found',
};

export default PageError;
