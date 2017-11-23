import React from 'react';
import { getRouteProps } from 'react-static';

import MdRenderer from '../../components/MdRenderer';
import PostHeader from '../../components/PostHeader';
import HeadPage from '../../components/HeadPage';

import { MdPageInfo } from '../../types';

export default getRouteProps(({ data, text }: MdPageInfo) => (
  <article>
    <HeadPage {...data} /> 
    <PostHeader {...data} />
    <MdRenderer text={text} />
  </article>
));
