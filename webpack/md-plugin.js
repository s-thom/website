const remark = require('remark');
const slug = require('remark-slug');
const autoLinkHeadings = require('remark-autolink-headings');
const highlight = require('remark-highlight.js');
const toc = require('remark-toc');
const html = require('remark-html');
const emoji = require('remark-emoji');

const autolinkConf = {
  content: {
    type: 'text',
    value: '#',
  },
  linkProperties: {
    className: 'phenomic-HeadingAnchor',
  }
};
const htmlConf = {
  entities: 'escape'
};
const processConf = {
  commonmark: true
};

function transformMd(text) {
  return remark()
    .use(slug)
    .use(autoLinkHeadings, autolinkConf)
    .use(html, htmlConf)
    .use(highlight)
    .use(toc)
    .use(emoji)
    .process(text, processConf)
    .toString();
}

function mdPlugin({result}) {
  return {
    ...result,
    body: transformMd(result.body)
  };
}

module.exports = mdPlugin;
