import React from 'react';

import {Link} from 'phenomic';
import HeaderList from '../components/HeaderList';

import {self}  from './collection';

const headerListRegex = /<!--\s?HEADER-PREVIEW\s([\w/\\.-]+)\s?-->/;

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
        let page = self(collection, url);
        if (page) {
          return <Link to={page.__url} ><HeaderList pages={[page]} showTypes={false} /></Link>;
        }
      }

      // If nothing matched, return the text
      return text;
    });
}
