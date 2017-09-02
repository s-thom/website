import React from 'react';
import PropTypes from 'prop-types';

import {layoutNames} from '../../metadata';
// Poach styles from header, that way it only needs to be written once
import headerStyles from '../Header/index.css';
import styles from './index.css';

const HeaderPreview = (
  {
    __url,
    title,
    img,
    bgcolor,
    layout,
    showType,
    type,
    fullSize
  }
) => {
  const headList = [];
  const headStyle = {};
  let headClasses = [
    styles.header,
    headerStyles.header
  ];

  if (showType) {
    let t;
    if (layoutNames[layout]) {
      t = layoutNames[layout];
    }
    if (type) {
      t = type;
    }

    if (t) {
      headList.push(<p className={headerStyles.type} key="type">{t}</p>);
      headClasses.push(headerStyles.showsType);
    }
  }

  if (img) {
    headClasses.push(headerStyles.headerWImg);
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push(headerStyles.headerWColor);
    headStyle.backgroundColor = bgcolor;
  }
  if (title) {
    headList.push(<h1 className={ headerStyles.heading } key="title">{ title }</h1>);
  }

  return (
      <div className={headClasses.join(' ')} style={headStyle} key={title}>{headList}</div>
  );
};

// @ts-ignore
HeaderPreview.propTypes = {
  __url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  bgcolor: PropTypes.string,
  layout: PropTypes.string.isRequired,
  showType: PropTypes.bool,
  type: PropTypes.string,
  fullSize: PropTypes.bool
};

export default HeaderPreview;
