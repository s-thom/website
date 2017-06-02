import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';

import styles from './index.css';

const Post = (props) => {
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
