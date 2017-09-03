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
  hasError,
  header,
}) {

  if (hasError) {
    return (<ErrorPage {...page}/>);
  }

  return (
    <Page {...page}>
      {isLoading && <Loading/>}
      {!isLoading &&
        page.node &&
        <article>
          <Header head={page.node} header={header}/>
          <MdRenderer content={page.node.body} />
        </article>}
    </Page>
  );
}

MdPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  page: PropTypes.object.isRequired,
  header: PropTypes.node,
};
