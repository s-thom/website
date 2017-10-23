import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";

import TestPage from './pages/TestPage';

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={TestPage} />
  </Router>
));