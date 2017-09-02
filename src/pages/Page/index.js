import React from 'react';
import PropTypes from 'prop-types';
import Head from 'react-helmet';
import joinUri from 'url-join';

import AppContainer from '../../layout/AppContainer';

// import Loading from '../../components/Loading';
// import Header from '../../components/Header';

// import { reactify } from '../../util';

import { pkg } from '../../metadata';

import styles from './index.css';

function PageMeta({ head, url }) {
  const metaTitle = 'no';
  head = {

  };
  // const metaTitle = head.metaTitle ? head.metaTitle : head.title;

  const meta = [
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: metaTitle },
    {
      property: 'og:url',
      content: joinUri(process.env.PHENOMIC_USER_URL, url),
    },
    { property: 'og:description', content: head.description },
    { name: 'twitter:card', content: head.img ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:creator', content: `@${pkg.twitter}` },
    { name: 'twitter:author', content: `@${pkg.twitter}` },
    { name: 'twitter:description', content: head.description },
    { name: 'description', content: head.description },
  ];

  if (head.img) {
    let imgUrl = joinUri(process.env.PHENOMIC_USER_URL, head.img);
    meta.push(
      { name: 'twitter:image', content: imgUrl, },
      { property: 'og:image', content: imgUrl }
    );
  }

  if (head.date) {
    let edited = head.edited || head.date;

    meta.push(
      { property: 'article:published_time', content: head.date },
      { property: 'article:modified_time', content: edited }
    );
  }

  if (head.tags) {
    head.tags.forEach((t) => {
      meta.push({ property: 'article:tag', content: t });
    });
  }

  return (
    <Head
      title={metaTitle}
      meta={meta}
    />
  );
}

//@ts-ignore
PageMeta.propTypes = {
  head: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  pkg: PropTypes.object.isRequired
};

const Page = ({ children, footer, error, status, node, url }) => {
  let headMeta;
  if (!error && status === 'idle') {



    headMeta = <PageMeta head={node} url={url} pkg={pkg} />;
  }

  return (
    <AppContainer>
      <div className={styles.Page}>
        {headMeta}
        {/* <Header  { ...props } /> */}
        {children}
        {footer}
      </div>
    </AppContainer>
  );
};

// @ts-ignore
Page.propTypes = {
  node: PropTypes.any,
  status: PropTypes.string.isRequired,
  error: PropTypes.any,
  children: PropTypes.node,
  footer: PropTypes.node,
  url: PropTypes.string.isRequired,
};

export default Page;
