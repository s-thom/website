import React from 'react';
import { withRouteData } from 'react-static';

import { MdPageChild } from '../../types';

import PostHeader from '../../components/PostHeader';
import PostHeaderList from '../../components/PostHeaderList';
import HeadPage from '../../components/HeadPage';
import MdRenderer from '../../components/MdRenderer';
import Link from '../../components/Link';

import './index.css';

export default withRouteData(({
  data,
  text,
}: MdPageChild) => {
  const lists = data.children
    .filter(c => c.children);
  const pages = data.children
    .filter(c => !c.children);

  return (
    <div>
      <HeadPage {...data} />
      <PostHeader {...data} />
      <MdRenderer text={text} />
      {
        pages.length && (
          <PostHeaderList pages={pages} />
        ) || null
      }
      {
        lists
          .map(child => (
            <div key={child.url}>
              <Link className="Home-listLink" href={child.url}>
                <h1>{child.title}</h1>
              </Link>
              <PostHeaderList pages={child.children} />
            </div>
        ))
      }
    </div>
  );
});
