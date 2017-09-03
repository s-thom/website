import React from 'react';
import PropTypes from 'prop-types';
import {
  BodyRenderer,
  createContainer,
  query
} from '@phenomic/preset-react-app/lib/client';
import Link from '@phenomic/plugin-renderer-react/lib/components/Link';

import Page from '../Page';

import HeaderList from '../../components/HeaderList';

export default function HomePage({
  isLoading,
  location: { pathname },
  hasError,
  posts,
  projects
}) {
  let page = {
    node: {
      title: 'Stuart Thomson',
      img: '/assets/img/banner.jpg',
    },
    status: 'idle',
  };

  return (
    <Page {...page} url={pathname}>
      <p>I'm a random person on the internet! I've been to the <Link to="https://waikato.ac.nz">University of Waikato</Link> to do a Bachelor's of Computing and Mathematical Sciences. I enjoy writing code, playing music, and walking (over mountains, through forests, around gardens. Anything really).</p>
      <p>You'll find a bunch of different projects over at <Link to="https://github.com/s-thom">GitHub</Link>. If you've played games with me online, you'll know there's another GitHub account I use for that with even more.</p>
      <p>This website is still rather quiet, and I'd like to do more with it. I'm in the process of converting/creating it, so it will get some love.</p>
      <h1>Recent Posts</h1>
      {!isLoading && <HeaderList root="/posts/" pages={posts.node.list} />}
      <h1>Recent Projects</h1>
      {!isLoading && <HeaderList root="/posts/" pages={projects.node.list} />}
    </Page>
  );
}

HomePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool,
  location: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
};

export const HomePageContainer = createContainer(HomePage, props => ({
  posts: query({ collection: 'posts' }),
  projects: query({ collection: 'projects' })
}));
