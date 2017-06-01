import React, { PropTypes } from 'react';
import {Link} from 'phenomic';

import HeaderPreview from '../HeaderPreview';

import styles from './index.css';

const HeaderList = ({ pages, showTypes }) => {
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
                <Link to={info.__url}>
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

HeaderList.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default HeaderList;
