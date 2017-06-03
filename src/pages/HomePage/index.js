import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';
import HeaderList from '../../components/HeaderList';

import {collection} from '../../util';
const {filter, filters, sort} = collection;

const Homepage = (props, { collection }) => {
  let layouts = props.head.listLayoutFilter;
  if (!Array.isArray(layouts)) {
    layouts = [layouts];
  }

  let posts = filter(
    collection, 
    filters.layout('Post'), 
    sort.NOT(sort.date), 
    6
  );

  let projects = filter(
    collection, 
    filters.layout('Project'), 
    sort.NOT(sort.date), 
    6
  );

  return (
    <Page { ...props }>
      <h2>Latest Projects</h2>
      <HeaderList pages={ projects } />
      <h2>Latest Posts</h2>
      <HeaderList pages={ posts } />
    </Page>
  );
};

// @ts-ignore
Homepage.propTypes = {
  head: PropTypes.object.isRequired
};

// @ts-ignore
Homepage.contextTypes = {
  collection: PropTypes.array.isRequired,
};

export default Homepage;
