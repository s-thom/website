import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

const FigureImage = (props) => {
  return (
    <figure className={styles.fig}>
      <img {...props} src={props.src} title={props.title || props.alt} />
      <figcaption>{props.alt}</figcaption>
    </figure>
  );
};

// @ts-ignore
FigureImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default FigureImage;
