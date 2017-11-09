import React from 'react';

import './index.css';

interface Props {
  src: string;
  alt: string;
  title?: string;
}

// tslint:disable-next-line function-name
export default function FigureImage(props: Props) {
  return (
    <figure className="FigureImage">
      <img src={props.src} title={props.title || props.alt} {...props} />
      <figcaption>{props.alt}</figcaption>
    </figure>
  );
}
