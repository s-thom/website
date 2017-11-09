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
  return (
    <ul className="PostHeaderList">{
      pages.map((page) => {
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
