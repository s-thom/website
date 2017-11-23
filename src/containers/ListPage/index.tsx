/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Head, getRouteProps } from 'react-static';
import Link from '../../components/Link';
import PostHeaderList from '../../components/PostHeaderList';
import HeadPage from '../../components/HeadPage';
import MdRenderer from '../../components/MdRenderer';

export default getRouteProps(({ children, data, text }) => {
  return (
    <div>
      <HeadPage {...data} />
      <h1>{data.title}</h1>
      <MdRenderer text={text} />
      <PostHeaderList pages={children} />
    </div>
  );
});
