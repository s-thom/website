import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';
import HeaderList from '../../components/HeaderList';

import {collection} from '../../util';
const {filter, filters, sort} = collection;

const Homepage = (props, { collection }) => {
  let hf = props.head.listFilter;

  // Set up filters
  let fs = [];
  if (!hf.showHidden) {
    fs.push(filters.visible);
  }
  if (hf.layout) {
    fs.push(filters.layout(hf.layout));
  }
  if (hf.path) {
    fs.push(filters.child(hf.path));
  }
  if (hf.tag) {
    fs.push(filters.tagged(hf.tag));
  }

  // Set up sort
  let s = sort.prop(hf.sort || 'priority');
  if (hf.reverse){
    // @ts-ignore
    s = sort.NOT(s);
  }

  // Set limit
  let limit = hf.limit || 50;

  let elProps = {
    pages: filter(collection, fs, s, limit)
  };
  if (hf.showTypes) {
    elProps.showTypes = true;
  }

  return (
    <Page { ...props }>
      <HeaderList {...elProps} />
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
