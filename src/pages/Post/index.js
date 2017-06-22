import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'phenomic';

import Page from '../Page';
import HeaderPreview from '../../components/HeaderPreview';

import {collection} from '../../util';
const {filter, filters, parent, sort} = collection;

import styles from './index.css';

const Post = (props, {collection}) => {
  let {head, __url} = props;
  let pageUrl = __url || head.__url;

  const pageDate = head.date ? new Date(head.date) : null;
  const editDate = head.edited ? new Date(head.edited) : null;

  // Add post/edit time to header
  let dateNodes = [];
  if (pageDate) {
    dateNodes.push(
      <em key={ pageDate.toISOString() }><time>
        { pageDate.toDateString() }
      </time></em>
    );
  }
  if (pageDate && editDate) {
    dateNodes.push(<br key="edit-separator" />);
  }
  if (editDate) {
    dateNodes.push(
      <em key={ editDate.toISOString() }><time>
        Edited: { editDate.toDateString() }
      </time></em>
    );
  }

  // Add header from props in as well
  let header = <div>{[
    <div className={styles.time} key='dates'>{dateNodes}</div>,
    (props.header && <div key='inner'>{props.header}</div>) || undefined
  ]}</div>;

  // Big messy footer section
  let footer;
  if (pageDate) {
    // Find the posts immediately around this one
    let prevs = filter(
      collection,
      [
        filters.layout(head.layout),
        filters.before(pageDate),
        filters.visible
      ],
      sort.NOT(sort.date)
    );
    let nexts = filter(
      collection,
      [
        filters.layout(head.layout),
        filters.after(pageDate),
        filters.visible
      ],
      sort.date
    );
    let pr = parent(collection, pageUrl);

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
    if (pr) {
      cat = (
        <Link to={pr.__url} className={styles.navItem} key="cat">
          <HeaderPreview { ...pr } showType type="Show All" />
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
  __url: PropTypes.string,
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
