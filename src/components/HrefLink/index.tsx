import React from 'react';
import { Link } from 'react-static';

interface Props {
  href?: string;
  to?: string;
}

export default function HrefLink(props: Props) {
  return <Link to={props.to || props.href} {...props} />;
}
