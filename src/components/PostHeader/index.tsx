import React from 'react';
import Svg from 'react-svg-inline';

import { MdPageData } from '../../types';
import Link from '../Link';
import { dateStr } from '../../util';

import svgGithub from '../../include/github.svg';

import './index.css';

export default function PostHeader({
  title,
  img,
  bgcolor,
  url,
  date,
  edited,
  type,
  showType,
  github,
}: MdPageData) {
  const headList = [];
  const headStyle: any = {};
  const headClasses = ['PostHeader'];
  let titleElement = null;

  if (img) {
    headClasses.push('PostHeader-headerWImg');
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push('PostHeader-headerWColor');
    headStyle.backgroundColor = bgcolor;
  }
  if (title) {
    titleElement = <h1 className="PostHeader-heading" key="title">{ title }</h1>;
  }
  const pageDate = date ? new Date(date) : null;
  const editDate = edited ? new Date(edited) : null;

  // Add post/edit time to header
  const dateNodes = [];
  if (pageDate) {
    dateNodes.push((
      <p className="PostHeader-date" key="PostHeader-dateOriginal">
        <em><time dateTime={date}>
          {dateStr(pageDate)}
        </time></em>
      </p>
    ));
  }
  if (editDate) {
    dateNodes.push((
      <p className="PostHeader-date" key="PostHeader-dateEdited">
        <em key={editDate.toISOString()}>Edited: {dateStr(editDate)}</em>
      </p>
    ));
  }
  
  // Add type
  if (showType && type) {
    headList.push(<p className="PostHeader-type">{type}</p>);
  }

  // Add GitHub URL
  if (github) {
    headList.push((
      <p className="PostHeader-github">
        <Link href={`https://github.com/${github}`}>
          <Svg svg={svgGithub} className="PostHeader-svg" cleanup />
          {' '}
          {github}
        </Link>
      </p>
    ));
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
      })
      .reduce((p, c) => p.concat(c), []); // Flatten array

      crumbs.unshift(<Link to='/' className="PostHeader-crumb" key="bc-home">Home</Link>, <span key="spacer-home"> &gt; </span>);
      headList.push(<nav className="PostHeader-breadcrumbs" key="breadcrumbs">{crumbs}</nav>);
    }
  }

  return (
    <header className={headClasses.join(' ')} style={headStyle}>
      {titleElement}
      <div className="PostHeader-detail">
        <div className="PostHeader-items">
          {headList}
        </div>
        <div className="PostHeader-date">
          {dateNodes}
        </div>
      </div>
    </header>
  );
}
