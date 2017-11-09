import React from 'react'
import { getRouteProps, Link } from 'react-static'
//

export default getRouteProps(({ data, contents }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <h3>{data.title}</h3>
    <p>{contents}</p>
  </div>
))
