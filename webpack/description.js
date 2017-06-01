const remark = require('remark');
const stripMd = require('strip-markdown');
const prune = require('phenomic/lib/loader-plugin-markdown-init-head.description-property-from-content/prune').default;

const defaultOpts = {
  pruneLength: 140,
  pruneString: '…'
};

/**
 * Almost a direct clone of default phemonic description generator,
 * but allows for sprcifying where description starts with <!-- desc -->
 */
function makeDesc(text, opts = {}) {
  opts = { ...defaultOpts, ...opts };

  let str = text;
  let match = text.match(/<!--\s?desc\s?-->\s+(.*)/);
  if (match) {
    str = match[1];
  }


  if (opts.pruneLength === 0) {
    // eslint-disable-next-line no-console
    console.warn(
      'You defined \'description.pruneLength\' of phenomic loader ' +
      'with an zero value. This does not make sense, ' +
      `so the default value ${ defaultOpts.pruneLength } has been used.`
    );

    opts.pruneLength = defaultOpts.pruneLength;
  }

  return prune(
    remark()
      .use(stripMd)
      .process(str)
      .toString()
      .replace(/\n+/g, '\n') // Replace multiple new lines with one
      .replace(/\n/g, ' ') // Avoid useless new lines
      .trim()
    ,
    opts.pruneLength,
    opts.pruneString
  );
}

function descPlugin({result}) {
  let res = makeDesc(result.body);

  return {
    ...result,
    head: {
      ...result.head,
      description: res
    }
  };
}

module.exports = descPlugin;
