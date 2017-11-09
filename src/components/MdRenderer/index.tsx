// Many portions of this file are taken from Phenomic's markdown rendering
// Refer to the following links for the original source
// tslint:disable max-line-length
// https://github.com/phenomic/phenomic/blob/master/packages/plugin-transform-markdown/src/transformer.js
// https://github.com/phenomic/phenomic/blob/master/packages/plugin-renderer-react/src/components/BodyRenderer.js
// tslint:enable max-line-length

import React from 'react';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import rehypeRaw from 'rehype-raw';

import HrefLink from '../HrefLink';
import FigureImage from '../FigureImage';

type ComponentType = string | React.ComponentType<any>;

interface ComponentMap { 
  [x: string]: ComponentType;
}

interface Props {
  text: string;
  components?: ComponentMap;
}

type ItemType =
  | string
  | {
    // tag
    t?: string,
    // props
    p?: Object,
    // children
    c: ItemType | ItemType[],
  };

const defaultComponents: ComponentMap = {
  a: HrefLink,
  img: FigureImage,
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeReact, { createElement });

function renderItems(
  item: ItemType, 
  components: ComponentMap,
  key?: any,
): string | JSX.Element | null {
  if (!item) {
    return null;
  }
  if (typeof item === 'string') {
    return item;
  }
  const { p: props = {}, c: children } = item;
  // tslint:disable-next-line variable-name
  const Tag =
    (components && item.t && components[item.t]) ||
    item.t ||
    'div';

  return (
    <Tag {...props} key={key}>
      {Array.isArray(children)
        ? children.map((child: ItemType, key) => renderItems(child, components, key))
        : renderItems(children, components)}
    </Tag>
  );
}


// here we optimize structure just a little to have to smallest json possible
// Taken from Phenomic
function createElement(component: string, props: any, children: any) {
  return {
    t: component,
    ...(props && Object.keys(props).length ? { p: props } : {}),
    ...(children ? { c: children } : {}),
  };
}

// tslint:disable-next-line function-name
export default function MdRenderer({
  text,
  components,
}: Props) {
  const r = renderItems(
    processor.processSync(text).contents, 
    {
      // force to mix components, as default one (Link) is crucial
      ...defaultComponents,
      ...(components || {}),
    },
  );
  return typeof r === 'string' ? <div>{r}</div> : r;
}
