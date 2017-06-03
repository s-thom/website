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

export function filter(collection, filters, sorter = 'title', limit = 0) {

}

export function parent(collection, url) {

}
