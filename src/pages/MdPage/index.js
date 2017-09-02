import React from 'react';
import PropTypes from 'prop-types';
import {
  BodyRenderer,
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';
import Link from '@phenomic/plugin-renderer-react/lib/components/Link';

import Page from '../Page';
import ErrorPage from '../ErrorPage';

import Loading from '../../components/Loading';

export default function MdPage({
  isLoading,
  page,
  location: { pathname },
  hasError
}) {

  if (hasError) {
    return (<ErrorPage {...page} url={pathname}/>);
  }

  return (
    <Page {...page} url={pathname}>
      {isLoading && <Loading/>}
      {!isLoading &&
        page.node &&
        <article>
          <h1>{page.node.title}</h1>
          <BodyRenderer>{page.node.body}</BodyRenderer>
        </article>}
      <footer>
        <Link to="/">Go to home</Link>
      </footer>
    </Page>
  );
}

MdPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  page: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const MdPageContainer = createContainer(MdPage, props => ({
  page: query({ collection: 'posts', id: props.params.splat })
}));
