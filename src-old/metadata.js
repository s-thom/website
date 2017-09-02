// you can add any STATIC data you want here
import pkg from '../package.json';

const layoutNames = {};

let win;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-undef
  win = window;
}

export {
  pkg,
  layoutNames, // gets filled out in routes.js
  win as window
};
