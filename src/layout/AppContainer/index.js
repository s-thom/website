import React from 'react';
import PropTypes from 'prop-types';

import '../../include/index.global.css';
import '../../include/highlight.global.css';

import styles from './index.css';

import Header from '../Header';
import Footer from '../Footer';

const AppContainer = (props) => (
  <div className={styles.AppContainer}>
    <Header />
    <div className={styles.container}>
      { props.children }
    </div>
    <Footer />
  </div>
);

// @ts-ignore
AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
