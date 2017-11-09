import React from 'react';
import { getRouteProps, Link } from 'react-static';

import MdRenderer from '../components/MdRenderer';
//

export default getRouteProps(({ data, text }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{data.title}</h3>
    <MdRenderer text={text} />
  </div>
));
