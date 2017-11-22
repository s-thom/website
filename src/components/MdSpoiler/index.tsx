import React from 'react';

import './index.css';

interface Props {
  text: string;
  title?: string;
}

export default function MdSpoiler({
  title = 'Spoiler',
  text,
}: Props) {
  return (
    <span className="MdSpoiler">
      <span className="MdSpoiler-title">{title}</span>
      <span className="MdSpoiler-text" title={text}>{text}</span>
    </span>
  );
}
