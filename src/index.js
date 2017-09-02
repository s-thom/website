import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client';

import Html from './layout/Html';
import TEST from './pages/TEST';

export const routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={TEST} />
  </Router>;

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
