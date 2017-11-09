import React from 'react';

import { MdPageData } from '../../types';

// Poach styles from header, that way it only needs to be written once
import '../PostHeader/index.css';
import './index.css';

export default function PostHeaderPreview({
  title,
  img,
  bgcolor,
  showType,
  type,
}: MdPageData) {
  const headList = [];
  const headStyle: any = {};
  const headClasses = [
    'PostHeaderPreview',
    'PostHeader',
  ];

  if (showType && type) {
    headList.push(<p className="PostHeader-type" key="type">{type}</p>);
    headClasses.push('PostHeader-showsType');
  }

  if (img) {
    headClasses.push('PostHeader-headerWImg');
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push('PostHeader-headerWColor');
    headStyle.backgroundColor = bgcolor;
  }
  if (title) {
    headList.push(<h1 className="PostHeader-heading" key="title">{ title }</h1>);
  }

  return (
    <div className={headClasses.join(' ')} style={headStyle} key={title}>{headList}</div>
  );
}
