import React from 'react';
import PropTypes from 'prop-types';
import { getRouteProps, Link } from 'react-static';

import { MdPageData } from '../../types';

import PostHeader from '../../components/PostHeader';
import PostHeaderList from '../../components/PostHeaderList';

interface Props {
  lists: {
    [x: string]: MdPageData[];
  };
} 

export default getRouteProps(({
  lists,
}: Props) => {
  const page: MdPageData = {
    title: 'Hi, I\'m Stuart Thomson',
    img: '/assets/img/banner.jpg',
    filename: '',
    id: 'home',
    url: '/',
    layout: 'Home',
    date: null,
  };

  console.log(lists);

  return (
    <div>
      <PostHeader {...page} />
      <p>I'm a random person on the internet! I've been to the <Link to="https://waikato.ac.nz">University of Waikato</Link> to do a Bachelor's of Computing and Mathematical Sciences. I enjoy writing code, playing music, and walking (over mountains, through forests, around gardens. Anything really).</p>
      <p>You'll find a bunch of different projects over at <Link to="https://github.com/s-thom">GitHub</Link>. If you've played games with me online, you'll know there's another GitHub account I use for that with even more.</p>
      <p>This website is still rather quiet, and I'd like to do more with it. I'm in the process of converting/creating it, so it will get some love.</p>
      <h1>Recent Posts</h1>
      <PostHeaderList root="/posts/" pages={lists.posts} />
      <h1>Recent Projects</h1>
      <PostHeaderList root="/projects/" pages={lists.projects} />
    </div>
  );
});
