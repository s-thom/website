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

export default function ProjectPage(props) {

  return (
    <MdPage {...props} />
  );
}

export const ProjectPageContainer = createContainer(ProjectPage, props => ({
  page: query({ collection: 'projects', id: props.params.splat })
}));

export function ProjectListPage({
  isLoading,
  projects,
  location: { pathname },
}) {
  let page = {
    node: {
      title: 'All Projects',
    },
    status: 'idle',
  };
  return (
    <Page {...page}>
      <Header head={page.node} url={pathname} />
      {!isLoading && <HeaderList root="/projects/" pages={projects.node.list} />}
    </Page>
  );
}

ProjectListPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
};

export const ProjectListPageContainer = createContainer(ProjectListPage, props => ({
  projects: query({ collection: 'projects' }),
}));
