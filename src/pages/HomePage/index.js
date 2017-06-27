import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';

const Homepage = (props) => {
  return (
    <Page { ...props } />
  );
};

// @ts-ignore
Homepage.propTypes = {
  head: PropTypes.object.isRequired
};

export default Homepage;
