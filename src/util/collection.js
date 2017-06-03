export const filters = {
  AND: (fs) => (i) => fs.reduce((p, f) => (p && f(i)), true),
  OR: (fs) => (i) => fs.reduce((p, f) => (p || f(i)), false),
  NOT: (filter) => (i) => !filter(i),
  layout: (layout) => (i) => i.layout === layout,
  visible: (i) => !i.hidden,
  after: (date) => (i) => i.date && new Date(i.date) > date,
  before: (date) => (i) => i.date && new Date(i.date) < date,
  tagged: (tag) => (i) => i.tags && i.tags.includes(tag),
  child: (url) => {
    let escaped = url.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let exp = new RegExp(`^${escaped}`);
    return (i) => i.__url.match(exp);
  }
};

export const sort = {
  NOT: (s) => (a, b) => s(a, b) * -1,
  prop: (prop) => (a, b) => {
    a = a[prop];
    b = b[prop];
    if (!a && !b) {return 0;}
    if (!a) {return -1;}
    if (!b) {return 1;}
    if (a < b) {return -1;}
    if (a > b) {return 1;}
    return 0;
  },
  date: (a, b) => {
    a = a.edited || a.date;
    b = b.edited || b.date;
    if (!a && !b) {return 0;}
    if (!a) {return -1;}
    if (!b) {return 1;}
    if (a < b) {return -1;}
    if (a > b) {return 1;}
    return 0;
  }
};

/**
 * Filters a collection
 * 
 * When Phenomic 1.0 releases, will probably need to modify
 * 
 * @export
 * @param {object[]} collection 
 * @param {((function)[]|function)} filters 
 * @param {(function|string)} sorter 
 * @param {number} [limit=0] 
 * @returns {object[]}
 */
export function filter(collection, filters, sorter = 'title', limit = 0) {
  // Make sure there is actually an array of functions
  let fnArray;
  if (Array.isArray(filters)) {
    fnArray = filters;
  } else if (typeof filters === 'function') {
    fnArray = [filters];
  } else {
    throw 'filter requires an array of filter functions';
  }

  let sortFn;
  if (typeof sorter === 'function') {
    sortFn = sorter;
  } else if (typeof sorter === 'string') {
    sortFn = sort.prop(sorter);
  } else {
    throw 'the sorter must be a function or string';
  }

  let filtered = collection.filter((item) => {
    return fnArray.reduce((allow, fn) => {
      return allow && fn(item);
    }, true);
  });

  filtered.sort(sortFn);

  return filtered;
}

/**
 * Finds the hierarchical parent of the given URL 
 * 
 * @export
 * @param {any} collection Collection to search
 * @param {any} url URL of current page
 * @returns {object}
 */
export function parent(collection, url) {
  if (url === '/') {
    return undefined;
  }

  let parts = url.split('/');
  parts.splice(-2, 2, '');
  let parentUrl = parts.join('/');

  let arr = filter(collection, [(i) => i.__url === parentUrl]);
  if (arr.length) {
    return arr[0];
  }
  return undefined;
}
