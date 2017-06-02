import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'phenomic';
import enhanceCollection from 'phenomic/lib/enhance-collection';

import Page from '../Page';
import HeaderPreview from '../../components/HeaderPreview';

import styles from './index.css';

const Post = (props, {collection}) => {
  let {head} = props;

  const pageDate = head.date ? new Date(head.date) : null;
  const editDate = head.edited ? new Date(head.edited) : null;


  let dateNodes = [];
  if (pageDate) {
    dateNodes.push(
      <em key={ pageDate.toISOString() }><time>
        { pageDate.toDateString() }
      </time></em>
    );
  }
  if (pageDate && editDate) {
    dateNodes.push(<br />);
  }
  if (editDate) {
    dateNodes.push(
      <em key={ editDate.toISOString() }><time>
        Edited: { editDate.toDateString() }
      </time></em>
    );
  }

  let header = <div>{[
    <div className={styles.time}>{dateNodes}</div>,
    props.header || undefined
  ]}</div>;

  let footer;
  if (pageDate) {
    let prevs = enhanceCollection(collection, {
      filters: [
        i => i.layout === head.layout,
        i => i.date && new Date(i.date) < pageDate,
        i => !i.hidden
      ],
      sort: 'date',
      reverse: true,
      limit: 1
    });
    let nexts = enhanceCollection(collection, {
      filters: [
        i => i.layout === head.layout,
        i => i.date && new Date(i.date) > pageDate,
        i => !i.hidden
      ],
      sort: 'date',
      reverse: false,
      limit: 1
    });
    let categoriser = enhanceCollection(collection, {
      filters: [
        i => i.layout === 'ListPage',
        i => i.listFilter && i.listFilter.layout && i.listFilter.layout === head.layout,
        i => !i.hidden
      ],
      sort: 'date',
      reverse: false,
      limit: 1
    });

    let next;
    let prev;
    let cat;
    if (prevs.length) {
      let i = prevs[0];
      prev = (
        <Link to={i.__url} className={styles.navItem} key="prv">
          <HeaderPreview { ...i } showType type={`Previous ${i.layout}`} />
        </Link>
      );
    } else {
      prev = <div className={styles.navItem} key="prv" />;
    }
    if (categoriser.length) {
      let i = categoriser[0];
      cat = (
        <Link to={i.__url} className={styles.navItem} key="cat">
          <HeaderPreview { ...i } showType type="Show All" />
        </Link>
      );
    } else {
      cat = <div className={styles.navItem} key="cat" />;
    }
    if (nexts.length) {
      let i = nexts[0];
      next = (
        <Link to={i.__url} className={styles.navItem} key="nxt">
          <HeaderPreview { ...i } showType type={`Next ${i.layout}`} />
        </Link>
      );
    } else {
      next = <div className={styles.navItem} key="nxt" />;
    }

    footer = (
      <div className={styles.bottomNav}>
        {prev}
        {cat}
        {next}
      </div>
    );
    
  }

  return (
    <Page
      { ...props }
      header={header}
      footer={footer}/>
  );
};

// @ts-ignore
Post.propTypes = {
  head: PropTypes.object.isRequired,
  header: PropTypes.any
};

// @ts-ignore
Post.contextTypes = {
  collection: PropTypes.array.isRequired,
};

// @ts-ignore
Post.type = 'Post';

export default Post;
