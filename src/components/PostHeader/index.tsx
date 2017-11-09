import React from 'react';
import { Link } from 'react-static';

import { MdPageData } from '../../types';

import './index.css';

export default function PostHeader({
  title,
  img,
  bgcolor,
  url,
}: MdPageData) {
  const headList = [];
  const headStyle: any = {};
  const headClasses = ['PostHeader'];

  if (img) {
    headClasses.push('PostHeader-headerWImg');
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push('PostHeader-&1');
    headStyle.backgroundColor = bgcolor;
  }
  if (title) {
    headList.push(<h1 className="PostHeader-heading" key="title">{ title }</h1>);
  }

  // Breadcrumbs
  if (url) {
    // Split url, remove empty strings
    const parts = url.split('/').filter(s => s);
    // If there's no crumbs, don't do anything
    if (parts.length) {
      const crumbs = parts.map((c,i) => {
        const arr = [];
        if (i + 1 === parts.length) {
          // Final one, replace with page title
          arr.push(<Link to={url} className="PostHeader-crumb" key="bc-final">{title}</Link>);
        } else {
          // Generate the URL for this crumb
          // This would work for the above line, but we already had the url
          const partialUrl = `/${parts.slice(0, i + 1).join('/')}/`;
          arr.push(<Link to={partialUrl} className="PostHeader-crumb" key={`bc-${i}`}>{c}</Link>);
          // Spacer
          arr.push(<span key={`spacer-${i}`}> &gt; </span>);
        }
        return arr;
      });

      crumbs.unshift(<Link to='/' className="PostHeader-crumb" key="bc-home">Home</Link>, <span key="spacer-home"> &gt; </span>);
      headList.push(<nav className="PostHeader-breadcrumbs" key="breadcrumbs">{crumbs}</nav>);
    }
  }

  return (
    <header className={headClasses.join(' ')} style={headStyle}>{headList}</header>
  );
}
