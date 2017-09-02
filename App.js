import React from 'react';
import {
  Router,
  Route,
  browserHistory,
} from 'react-router';
import {
  createApp,
  renderApp,
} from '@phenomic/preset-react-app/lib/client';

import { HomePageContainer } from './src/pages/HomePage';
import { MdPageContainer } from './src/pages/MdPage';
import ErrorPage from './src/pages/ErrorPage';
import Html from './src/layout/Html';

const routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={HomePageContainer} />
    <Route path="/blog/*" component={MdPageContainer} />
    <Route path="*" component={ErrorPage} />
  </Router>;

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
