import React from 'react';
import PropTypes from 'prop-types';
import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import MdPage from '../MdPage';

export default function PostPage(props) {

  return (
    <MdPage {...props} />
  );
}

export const PostPageContainer = createContainer(PostPage, props => ({
  page: query({ collection: 'posts', id: props.params.splat })
}));
