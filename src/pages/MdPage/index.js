import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';
import ErrorPage from '../ErrorPage';

import MdRenderer from '../../components/MdRenderer';
import Loading from '../../components/Loading';
import Header from '../../components/Header';

export default function MdPage({
  isLoading,
  page,
  location: { pathname },
  hasError,
  header,
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
          <Header head={page.node} url={pathname} header={header}/>
          <MdRenderer content={page.node.body} />
        </article>}
    </Page>
  );
}

MdPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  page: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  header: PropTypes.node,
};
