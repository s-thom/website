import React from 'react';
import PropTypes from 'prop-types';

import Post from '../Post';

import styles from './index.css';

import {pkg} from '../../metadata';

const Project = (props) => {
  let {head} = props;

  const url = head.github ? `https://github.com/${pkg.github}/${head.github}` : null;

  return (
    <Post
      { ...props }
      header={
        <div className={styles.time}>
          {url && <a href={url} title='Repository Link'>{`${pkg.github}/${head.github}`}</a>}
        </div>
      }
    />
  );
};

// @ts-ignore
Project.propTypes = {
  head: PropTypes.object.isRequired,
};

// @ts-ignore
Project.type = 'Project';

export default Project;
