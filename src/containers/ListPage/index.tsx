/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Head, withRouteData } from 'react-static';
import Link from '../../components/Link';
import PostHeaderList from '../../components/PostHeaderList';
import HeadPage from '../../components/HeadPage';
import MdRenderer from '../../components/MdRenderer';

export default withRouteData(({ data, text }) => {
  return (
    <div>
      <HeadPage {...data} />
      <h1>{data.title}</h1>
      <MdRenderer text={text} />
      <PostHeaderList pages={data.children} />
    </div>
  );
});
