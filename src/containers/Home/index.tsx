import React from 'react';
import { getRouteProps } from 'react-static';

import { MdPageChild } from '../../types';

import PostHeader from '../../components/PostHeader';
import PostHeaderList from '../../components/PostHeaderList';
import HeadPage from '../../components/HeadPage';
import MdRenderer from '../../components/MdRenderer';

export default getRouteProps(({
  data,
  text,
  children,
}: MdPageChild) => {
  return (
    <div>
      <HeadPage {...data} />
      <PostHeader {...data} />
      <MdRenderer text={text} />
    </div>
  );
});
