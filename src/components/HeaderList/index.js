import React from 'react';
import PropTypes from 'prop-types';
import Link from '@phenomic/plugin-renderer-react/lib/components/Link';

import HeaderPreview from '../HeaderPreview';

import styles from './index.css';

const HeaderList = ({ pages, showTypes, root }) => {
  return (
    <div>
      {
      pages.length
      ? (
        <ul className={styles.container}>
          {
          pages.map((page) => {
            let info = {...page};
            if (showTypes) {
              info.showType = true;
            }
            return (
              <li className={styles.item} key={ info.title }>
                <Link to={`${root}${info.id}`}>
                  <HeaderPreview { ...info } />
                </Link>
              </li>
            );
          })
        }
        </ul>
      )
      : 'No pages yet.'
    }
    </div>
  );
};

// @ts-ignore
HeaderList.propTypes = {
  pages: PropTypes.array.isRequired,
  root: PropTypes.string.isRequired,
  showTypes: PropTypes.bool
};

export default HeaderList;
