import React from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-static';

ReactGA.initialize('UA-55893575-12');

export default withRouter(({ location }): null => {
  ReactGA.pageview(location.pathname);
  return null;
});
