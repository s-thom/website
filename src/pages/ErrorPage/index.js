import React from 'react';
import PropTypes from 'prop-types';
import Head from 'react-helmet';

import Page from '../Page';
import styles from './index.css';

export default function PageError(props) {
  const { error } = props;

  const status = (error && error.status) || 404;

  let message;
  switch (status) {
    case 404:
      message = 'Page not found';
      break;
    default:
      message = `Unknown error \`${status}\` occurred`;
      break;
  }

  return (
    <Page {...props}>
      <Head>
        <title>{message}</title>
      </Head>
      <div className={styles.oops}>{'{uh_oh}'}</div>
      <div className={styles.text}>
        <h1 className={styles.title}>
          <strong>{status}</strong>
          {': '}
          {message}
        </h1>
        {
          error === 404 &&
          <div>
            {'It seems you found a broken link. '}
            {'This is where most websites would include a witty comment. Not this one.'}
          </div>
        }
      </div>
    </Page>
  );
}

PageError.propTypes = {
  error: PropTypes.any.isRequired,
};
