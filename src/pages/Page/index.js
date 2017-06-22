import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import invariant from 'invariant';
import { BodyContainer, joinUri } from 'phenomic';

import Loading from '../../components/Loading';
import Header from '../../components/Header';

import styles from './index.css';

const Page = (props
  ,
  {
    metadata: { pkg },
  }
) => {
  let {isLoading, __filename, __url, head, body, postheader, footer, children} = props;

  invariant(
    typeof head.title === 'string',
    `Your page '${ __filename }' needs a title`
  );

  const metaTitle = head.metaTitle ? head.metaTitle : head.title;

  const meta = [
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: metaTitle },
    {
      property: 'og:url',
      content: joinUri(process.env.PHENOMIC_USER_URL, __url),
    },
    { property: 'og:description', content: head.description },
    { name: 'twitter:card', content: head.img ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:creator', content: `@${ pkg.twitter }` },
    { name: 'twitter:author', content: `@${ pkg.twitter }` },
    { name: 'twitter:description', content: head.description },
    { name: 'description', content: head.description },
  ];

  if (head.img) {
    let imgUrl = joinUri(process.env.PHENOMIC_USER_URL, head.img);
    meta.push(
      {name: 'twitter:image', content: imgUrl,},
      {property: 'og:image', content: imgUrl}
    );
  }

  if (head.date) {
    let edited = head.edited || head.date;

    meta.push(
      {property: 'article:published_time', content: head.date},
      {property: 'article:modified_time', content: edited}
    );
  }

  if (head.tags) {
    head.tags.forEach((t) => {
      meta.push({property: 'article:tag', content: t});
    });
  }

  return (
    <div className={ styles.page }>
      <Helmet
        title={ metaTitle }
        meta={ meta }
      />
      <Header  { ...props } />
      {postheader}
      {
        isLoading
        ? <Loading />
        : <BodyContainer>{ body }</BodyContainer>
      }
      { children }
      { footer }
    </div>
  );
};

// @ts-ignore
Page.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  __filename: PropTypes.string,
  __url: PropTypes.string,
  head: PropTypes.object.isRequired,
  body: PropTypes.string,
  header: PropTypes.element,
  footer: PropTypes.element,
  postheader: PropTypes.element
};

// @ts-ignore
Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
};

export default Page;
