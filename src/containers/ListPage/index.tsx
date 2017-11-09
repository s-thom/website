/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { getRouteProps, Link } from 'react-static';
//

export default getRouteProps(({ posts, name }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.filename}>
          <Link to={`/${name}/${post.id}/`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  </div>
));
