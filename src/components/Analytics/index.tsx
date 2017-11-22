import React from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-static';

import { isBrowser } from '../../browser';

if (isBrowser) {
  ReactGA.initialize('UA-55893575-12');
}

export default withRouter(({ location }): null => {
  if (isBrowser) {
    ReactGA.pageview(location.pathname);
  }
  return null;
});
