import React from 'react';
import { Route, browserHistory } from 'react-router';
import { PageContainer as PhenomicPageContainer } from 'phenomic';
import ReactGA from 'react-ga';

import meta from './metadata';

import AppContainer from './AppContainer';
import Page from './layouts/Page';
import PageError from './layouts/PageError';
import Homepage from './layouts/Homepage';
import Post from './layouts/Post';

if (browserHistory) {
  ReactGA.initialize(meta.pkg.ga);
}

const change = (loc) => {
  ReactGA.set({page: loc.pathname});
  ReactGA.pageview(loc.pathname);
};

const layoutList = {
  Page,
  PageError,
  Post,
  Homepage
};

// Add friendly names of pages to metadata
Object.keys(layoutList).forEach((key) => {
  if (layoutList[key].type) {
    meta.layoutNames[key] = layoutList[key].type;
  }
});

const PageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={layoutList}
  />
);

export default (
  <Route 
    component={ AppContainer }
    onChange={(prevState, nextState, replace) => {
      change(nextState.location);
      return true;
    }}
    onEnter={(nextState) => {
      change(nextState.location);
      return true;
    }}>
    <Route path="*" component={ PageContainer } />
  </Route>
);
