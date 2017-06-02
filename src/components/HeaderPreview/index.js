import React from 'react';
import PropTypes from 'prop-types';

import {layoutNames} from '../../metadata';
// Poach styles from header, that way it only needs to be written once
import styles from '../Header/index.css';

const HeaderPreview = (
  {
    __url,
    title,
    img,
    bgcolor,
    layout,
    showType,
    type
  }
) => {
  const headList = [];
  const headStyle = {};
  let headClasses = [styles.header];

  if (showType) {
    let t;
    if (layoutNames[layout]) {
      t = layoutNames[layout];
    }
    if (type) {
      t = type;
    }

    if (t) {
      headList.push(<p className={styles.type} key="type">{t}</p>);
      headClasses.push(styles.showsType);
    }
  }

  if (img) {
    headClasses.push(styles.headerWImg);
    headStyle.backgroundImage = `url(${img})`;
  } else if (bgcolor) {
    headClasses.push(styles.headerWColor);
    headStyle.backgroundColor = bgcolor;
  }
  if (title) {
    headList.push(<h1 className={ styles.heading } key="title">{ title }</h1>);
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
  showType: PropTypes.boolean,
  type: PropTypes.string
};

export default HeaderPreview;
