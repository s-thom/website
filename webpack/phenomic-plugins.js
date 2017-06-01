// Default plugins from phenomic
const loaderHeadConf = require('phenomic/lib/loader-plugin-init-head-property-from-config').default;
const loaderHeadContent = require('phenomic/lib/loader-plugin-init-head-property-from-content').default;
const loaderBodyContent = require('phenomic/lib/loader-plugin-init-body-property-from-content').default;

const desc = require('./description');
const imgWrapper = require('./img-wrapper');
const mdPlugin = require('./md-plugin');

module.exports = [
  loaderHeadConf,
  loaderHeadContent,
  loaderBodyContent,
  desc,
  imgWrapper,
  mdPlugin
];
