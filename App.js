import React from 'react';
import Head from 'react-helmet';
import { Router, Route, browserHistory, Link } from 'react-router';
import {
  createApp,
  renderApp,
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client';


import MdPage, { MdPageContainer } from './src/pages/MdPage';
import TEST from './src/pages/TEST';
import ErrorPage from './src/pages/ErrorPage';
import AppContainer from './src/layout/AppContainer';
import Html from './src/layout/Html';

const Home = ({ isLoading, posts }) =>
  <AppContainer>
    <Head>
      <title>Hello world</title>
      <meta name="description" content="Everything is awesome!" />
    </Head>
    <h1>Home</h1>
    {isLoading && 'Loading...'}
    {!isLoading &&
      <ul>
        {posts &&
          posts.node &&
          posts.node.list &&
          posts.node.list.map(post =>
            <li key={post.id}>
              <Link to={`/blog/${post.id}/`}>{post.title || post.id}</Link>
            </li>
          )}
      </ul>}
    <div>
      {posts.node &&
        posts.node.hasPreviousPage &&
        <Link
          to={
            posts.node.previousPageIsFirst
              ? '/'
              : `/after/${posts.node.previous}/`
          }
        >
          Newer posts
        </Link>}
      {' '}
      {posts.node &&
        posts.node.hasNextPage &&
        <Link to={`/after/${posts.node.next}/`}>Older posts</Link>}
    </div>
  </AppContainer>;

const HomeContainer = createContainer(Home, props => ({
  posts: query({
    collection: 'posts',
    limit: 2,
    after: props.params.after
  })
}));

const routes = () =>
  <AppContainer>
    <Router history={browserHistory}>
      <Route path="/" component={TEST} />
      <Route path="/after/:after" component={HomeContainer} />
      <Route path="/blog/*" component={MdPageContainer} />
      <Route path="*" component={ErrorPage} />
    </Router>
  </AppContainer>;

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
