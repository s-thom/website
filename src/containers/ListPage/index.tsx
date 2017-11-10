/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { getRouteProps } from 'react-static';
import Link from '../../components/Link';
import PostHeaderList from '../../components/PostHeaderList';
//

export default getRouteProps(({ posts, name }) => (
  <div>
    <h1>All {`${name[0].toUpperCase()}${[...name].slice(1).join('')}`}</h1>
    <PostHeaderList pages={posts} />
  </div>
));
