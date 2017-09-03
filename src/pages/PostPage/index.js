import React from 'react';
import PropTypes from 'prop-types';
import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import Page from '../Page';
import MdPage from '../MdPage';

import Header from '../../components/Header';
import HeaderList from '../../components/HeaderList';

export default function PostPage(props) {
  return (
    <MdPage {...props} />
  );
}

export const PostPageContainer = createContainer(PostPage, props => ({
  page: query({ collection: 'posts', id: props.params.splat })
}));

export function PostListPage({
  isLoading,
  posts,
}) {
  let page = {
    node: {
      title: 'All Posts',
    },
    status: 'idle',
  };
  return (
    <Page {...page}>
      <Header head={page.node} />
      {!isLoading && <HeaderList root="/posts/" pages={posts.node.list} />}
    </Page>
  );
}

PostListPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.object.isRequired,
};

export const PostListPageContainer = createContainer(PostListPage, props => ({
  posts: query({ collection: 'posts' }),
}));
