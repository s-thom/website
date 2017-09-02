import React from 'react';
import {
  BodyRenderer,
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';
import Link from '@phenomic/plugin-renderer-react/lib/components/Link';

// ...

export default function MdPage({ isLoading, page }) {
  return (
    <div>
      {isLoading && 'Loading...'}
      {!isLoading &&
        page.node &&
        <article>
          <h1>{page.node.title}</h1>
          <BodyRenderer>{page.node.body}</BodyRenderer>
        </article>}
      <footer>
        <Link to="/">Go to home</Link>
      </footer>
    </div>
  );
}

export const MdPageContainer = createContainer(MdPage, props => ({
  page: query({ collection: 'posts', id: props.params.splat })
}));
