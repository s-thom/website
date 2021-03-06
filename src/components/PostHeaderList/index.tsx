import React from 'react';

import { MdPageData } from '../../types';

import PostHeaderPreview from '../PostHeaderPreview';
import Link from '../Link';

import './index.css';

interface Props {
  pages: MdPageData[];
  showTypes?: boolean;
}

export default function PostHeaderList({
  pages, 
  showTypes,
}: Props) {
  const sorted = [...pages].sort((a, b) => {
    if (!a.date) {
      return -1;
    }
    if (!b.date) {
      return 1;
    }
    const [aDate, bDate] = [a, b].map(d => new Date(d.date).getTime());
    return bDate - aDate;
  });

  return (
    <ul className="PostHeaderList">{
      sorted.map((page) => {
        const info = { ...page };
        if (showTypes) {
          info.showType = true;
        }
        return (
          <li className="PostHeaderList-item" key={ info.title }>
            <Link to={info.url}>
              <PostHeaderPreview { ...info } />
            </Link>
          </li>
        );
      })
    }</ul>
  );
}
