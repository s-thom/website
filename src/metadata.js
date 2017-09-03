// you can add any STATIC data you want here
import pkg from '../package.json';

let win;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-undef
  win = window;
}

export {
  pkg,
  win as window
};
