import React, { PropTypes } from 'react';

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

Project.propTypes = {
  head: PropTypes.object.isRequired,
};

Project.type = 'Project';

export default Project;
