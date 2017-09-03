import React from 'react';
import PropTypes from 'prop-types';
import {
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';

import MdPage from '../MdPage';

export default function ProjectPage(props) {

  return (
    <MdPage {...props} />
  );
}

export const ProjectPageContainer = createContainer(ProjectPage, props => ({
  page: query({ collection: 'projects', id: props.params.splat })
}));
