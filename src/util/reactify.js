import React from 'react';
import {Link} from 'phenomic';

import HeaderPreview from '../components/HeaderPreview';

import {self} from './collection';
import styles from './util.css';

const templateRegex = /<!--\s?([-\w]+)\s([\s\S]+?)\s?-->/;

function createHeaderPreview(url, collection) {
  // Get the page, and make a copy (so it can be modified)
  let page = Object.assign({}, self(collection, url));
  page.type = `Related ${page.layout}`;
  if (page) {
    return <Link to={url} className={styles.noHover}><HeaderPreview {...page} showType /></Link>;
  }
}

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
      let match = text.match(templateRegex);
      if (match) {
        let [full, component, propString = '{}'] = match;
        let props = JSON.parse(propString);
        console.log(props);
        switch(component) {
          case 'RELATED':
            return createHeaderPreview(props.url, collection);
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
