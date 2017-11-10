import React from 'react';
import { Link } from 'react-static';

interface Props {
  href?: string;
  to?: string;
}

export default function (props: Props) {
  const destination = props.to || props.href;
  const rest = { ...props };

  // Clear original properties so they won't overwrite
  delete rest.href;
  delete rest.to;

  // Use normal anchors for external links
  // For some reason, the router is jumping in and trying to be clever
  // It is not being clever.
  if (destination.match(/^(?:https?:|mailto:|tel:)/)) {
    return <a href={destination} {...rest} />;
  } else {
    return <Link to={destination} {...rest} />;
  }
}
