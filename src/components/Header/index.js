import React from 'react';
import PropTypes from 'prop-types';
import Link from '@phenomic/plugin-renderer-react/lib/components/Link';

import styles from './index.css';

const Header = ({
  head: {
    title,
    img,
    bgcolor,
    url,
  },
  header
}) => {
  const headList = [];
  const headStyle = {};
  let headClasses = [styles.header];

  if (img) {
    headClasses.push(styles.headerWImg);
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push(styles.headerWColor);
    headStyle.backgroundColor = bgcolor;
  }
  if (title) {
    headList.push(<h1 className={ styles.heading } key='title'>{ title }</h1>);
  }
  if (header) {
    headList.push(<div key='inner'>{header}</div>);
  }

  // Breadcrumbs
  if (url) {
    // Split url, remove empty strings
    let parts = url.split('/').filter(s => s);
    // If there's no crumbs, don't do anything
    if (parts.length) {
      let crumbs = parts.map((c,i)=>{
        let arr = [];
        if (i + 1 === parts.length) {
          // Final one, replace with page title
          arr.push(<Link to={url} className={styles.crumb} key='bc-final'>{title}</Link>);
        } else {
          // Generate the URL for this crumb
          // This would work for the above line, but we already had the url
          let url = `/${parts.slice(0, i + 1).join('/')}/`;
          arr.push(<Link to={url} className={styles.crumb} key={`bc-${i}`}>{c}</Link>);
          // Spacer
          arr.push(<span key={`spacer-${i}`}> &gt; </span>);
        }
        return arr;
      });
      crumbs.unshift(<Link to='/' className={styles.crumb} key='bc-home'>Home</Link>, <span key='spacer-home'> &gt; </span>);
      headList.push(<nav className={styles.breadcrumbs} key='breadcrumbs'>{crumbs}</nav>);
    }
  }

  return (
    <div className={headClasses.join(' ')} style={headStyle}>{headList}</div>
  );
};

// @ts-ignore
Header.propTypes = {
  url: PropTypes.string,
  head: PropTypes.object.isRequired,
  header: PropTypes.element
};

export default Header;
