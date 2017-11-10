/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Head, getRouteProps } from 'react-static';
import Link from '../../components/Link';
import PostHeaderList from '../../components/PostHeaderList';
import HeadPage from '../../components/HeadPage';

export default getRouteProps(({ posts, name }) => {
  const title = `All ${name[0].toUpperCase()}${[...name].slice(1).join('')}`;

  return (
    <div>
      <HeadPage
        title={title}
        url={`/${name}/`}
        description={title}
      />
      <h1>{title}</h1>
      <PostHeaderList pages={posts} />
    </div>
  );
});
