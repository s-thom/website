import React from 'react';
import PropTypes from 'prop-types';

import './index.global.css';
import './highlight.global.css';

import Header from '../Header';
import Footer from '../Footer';

const AppContainer = (props) => (
  <div>
    <Header />
    <div>
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
