import React from 'react';

import HeaderList from '../components/HeaderList';

import {self}  from './collection';

const headerListRegex = /<!--\s?RELATED\s([\w/\\.-]+)\s?-->/;

/**
 * Finds template comments and turns them into proper elements
 * 
 * @export
 * @param {string} body Body content
 */
export default function reactify(body, collection) {
  if (!body) {
    return undefined;
  }
  return body
    .split(/\r?\n/g)
    .map((text) => {
      let match;
      match = text.match(headerListRegex);
      if (match) {
        let url = match[1];
        // Get the page, and make a copy (so it can be modified)
        let page = Object.assign({}, self(collection, url));
        page.type = `Related ${page.layout}`;
        if (page) {
          return <HeaderList pages={[page]} showTypes={true} />;
        }
      }

      // If nothing matched, return the text
      return text;
    })
    .reduce((arr, curr) => {
      if (typeof curr === 'string') {
        let last = arr[arr.length - 1];
        if (!last) {
          arr.push(curr);
          return arr;
        } else if (typeof last === 'string') {
          let newLast = `${last}\n${curr}`;
          arr[arr.length - 1] = newLast;
          return arr;
        } else {
          arr.push(curr);
          return arr;
        }
      } else {
        arr.push(curr);
        return arr;
      }
    }, []);
}
