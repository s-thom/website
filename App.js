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
import { PostPageContainer } from './src/pages/PostPage';
import { ProjectPageContainer } from './src/pages/ProjectPage';
import ErrorPage from './src/pages/ErrorPage';
import Html from './src/layout/Html';

const routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={HomePageContainer} />
    <Route path="/posts/*" component={PostPageContainer} />
    <Route path="/projects/*" component={ProjectPageContainer} />
    <Route path="*" component={ErrorPage} />
  </Router>;

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
