/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Head, getRouteProps } from 'react-static';
import Link from '../../components/Link';
import PostHeaderList from '../../components/PostHeaderList';
//

export default getRouteProps(({ posts, name }) => {
  const title = `${name[0].toUpperCase()}${[...name].slice(1).join('')}`;

  return (
    <div>

      <h1>All {title}</h1>
      <PostHeaderList pages={posts} />
    </div>
  );
});
