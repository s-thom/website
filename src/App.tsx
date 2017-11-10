import React from 'react';
import { Router } from 'react-static';

import Routes from 'react-static-routes';

import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

import './app.css';
import './include/index.global.css';
import './include/highlight.global.css';

export default () => (
  <Router>
    <div className="App">
      <PageHeader />
      <div className="App-container">
        <Routes />
      </div>
      <PageFooter />
    </div>
  </Router>
);
