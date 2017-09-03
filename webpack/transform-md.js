// modified from https://github.com/phenomic/phenomic/blob/master/packages/plugin-transform-markdown/src/index.js

import deburr from 'lodash.deburr';
import kebabCase from 'lodash.kebabcase';
import frontMatterParser from 'gray-matter';

import remark from 'remark';
import toc from 'remark-toc';
import slug from 'remark-slug';
import autoLinkHeadings from 'remark-autolink-headings';
import html from 'remark-html';
import reactRenderer from 'remark-react';
import emoji from 'remark-emoji';
// for code highlight
import deepmerge from 'deepmerge';
import sanitizeGhSchema from 'hast-util-sanitize/lib/github.json';

const descDefaults = {
  pruneLength: 80,
  pruneString: '…'
};

function prune(s, maxLength, end) {
  if (s.length < maxLength) {
    return s;
  }

  const trimmed = s.substr(0, maxLength);

  return trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' '))) + end;
}

/**
 * Almost a direct clone of old phemonic description generator,
 * but allows for sprcifying where description starts with <!-- desc -->
 */
function makeDesc(text, opts = {}) {
  opts = { ...descDefaults, ...opts };

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
      `so the default value ${descDefaults.pruneLength} has been used.`
    );

    opts.pruneLength = descDefaults.pruneLength;
  }

  return prune(str.trim(), opts.pruneLength, opts.pruneString);
}

function remarkPlugins(config, body) {
  const remarkInstance = remark()
    .use(toc)
    .use(slug)
    .use(emoji)
    .use(autoLinkHeadings, {
      // @todo find how to make this options works with remark-react
      content: {
        type: 'text',
        value: '#'
      },
      linkProperties: {
        className: 'phenomic-HeadingAnchor'
      }
    });

  const useReact =
    config &&
    config.plugins &&
    config.plugins.find(p => p.name === '@phenomic/plugin-renderer-react');

  if (!useReact) {
    remarkInstance.use(html);
  } else {
    remarkInstance.use(reactRenderer, {
      sanitize: deepmerge(sanitizeGhSchema, {
        clobberPrefix: '',
        attributes: { '*': ['className'] }
      }),
      // we cannot rely on components from here as we are serializing this as json
      // remarkReactComponents: {
      //   code: RemarkLowlight(languages),
      // },
      createElement: (component, props, children) => {
        // here we optimize structure just a little to have to smallest json
        // possible
        return {
          c: children,
          ...(!props
            ? {}
            : Object.keys(props).length === 0 ? {} : { p: props }),
          t: component
        };
      }
    });
  }

  return remarkInstance.processSync(body, { commonmark: true });
}

function transformMarkdownFile({
  config,
  file,
  contents
}) {

  const front = frontMatterParser(contents.toString());
  const partial = {
    ...front.data,
    // @todo should be here or user land ?
    ...(Array.isArray(front.data.tags)
      ? {
        tags: front.data.tags.map(tag => kebabCase(deburr(tag)))
      }
      : {})
  };

  if (!partial.description) {
    partial.description = makeDesc(front.content);
  }

  if (!partial.url) {
    const match = file.name.match(/(.*)\.([^/]+)/);
    partial.url = match[1];
    partial.filetype = match[2];
  }

  return {
    data: {
      ...partial,
      body: remarkPlugins(config, front.content).contents
    },
    partial
  };
}

export default function() {
  return {
    name: 'sthom/transform-markdown',
    supportedFileTypes: ['md', 'markdown'],
    transform: transformMarkdownFile
  };
}
