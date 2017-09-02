import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {
  createApp,
  renderApp,
} from '@phenomic/preset-react-app/lib/client';

import AppContainer from './layout/AppContainer';
import Html from './layout/Html';
import { MdPageContainer } from './pages/MdPage';

export const routes = () => (
  <AppContainer>
    <Router history={browserHistory}>
      <Route path="test/*" component={MdPageContainer} />
    </Router>
  </AppContainer>
);

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
