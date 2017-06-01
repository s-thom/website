import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';

import styles from './index.css';

const Game = (props) => {
  let {head} = props;

  head.metaTitle = head.metaTitle || `Thoughts On: ${head.title}`;

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

  let postNodes = [<h2 key='heading'>Game Info</h2>];
  if (head.steam) {
    postNodes.push(<div key='steam'><a href={`http://store.steampowered.com/app/${head.steam}/`}>Steam</a></div>);
  }
  if (head.website) {
    postNodes.push(<div key='website'><a href={head.website}>Game Website</a></div>);
  }

  return (
    <Page
      { ...props }
      header={<div className={styles.time}>{dateNodes}</div>}
      postheader={<div className={styles.postheader}>{postNodes}</div>}
    />
  );
};

// @ts-ignore
Game.propTypes = {
  head: PropTypes.object.isRequired,
};

// @ts-ignore
Game.type = 'Game';

export default Game;
