import React from 'react';
import { Link } from 'react-static';

import { MdPageInfo } from '../../types';

import PostHeaderPreview from '../PostHeaderPreview';

import './index.css';

interface Props {
  pages: MdPageInfo[];
  root: string;
  showTypes?: boolean;
}

export default function PostHeaderList({
  pages, 
  showTypes,
}: Props) {
  return (
    <ul className="PostHeaderList">{
      pages.map((page) => {
        const info = { ...page.data };
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
