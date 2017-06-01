import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';

import styles from './index.css';

import meta from '../../metadata';

const pkg = meta.pkg;

const Project = (props) => {
  let {head} = props;

  const url = head.github ? `https://github.com/${pkg.github}/${head.github}` : null;

  return (
    <Page
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
