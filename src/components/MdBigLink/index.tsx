import React, { Component } from 'react';
import { prefetch } from 'react-static'

import PostHeaderPreview from '../PostHeaderPreview';
import Link from '../Link';
import { colorBrightness } from '../../util';

import './index.css';

interface Props {
  url: string;
  title: string;
  img?: string;
  bgcolor?: string;
  icon?: string;
}

export default function MdBigLink({
  title,
  img,
  bgcolor,
  url,
  icon,
}: Props) {
  const headStyle: any = {};
  const headClasses = [
    'BigLink',
  ];

  if (img) {
    headClasses.push('BigLink-headerWImg');
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push('BigLink-headerWColor');
    headStyle.backgroundColor = bgcolor;

    if (colorBrightness(bgcolor) > 150) {
      headClasses.push('BigLink-darkText');
    }
  }

  return (
    <Link className="BigLink-link" to={url}>
      <div className={headClasses.join(' ')} style={headStyle} key={title}>
        {icon &&  <img className="BigLink-icon" src={icon} alt={title} />}
        <div className="BigLink-text">
          <h1 className="BigLink-heading" key="title">{title}</h1>
          <p className="BigLink-url" key="url">{url}</p>
        </div>
      </div>
    </Link>
  );
}
