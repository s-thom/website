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

import { Link } from 'react-static';

type ComponentType = string | React.ComponentType<any>;

interface OptionsType {
  components?: { [key: string]: ComponentType };
  DefaultComponent?: ComponentType;
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

const defaultProps = { DefaultComponent: 'div' };

const defaultOptions: OptionsType = {
  // components: {
  //   a: Link,
  // },
};

function renderItems(item: ItemType, options: OptionsType, key?: any): string | JSX.Element | null {
  if (!item) {
    return null;
  }
  if (typeof item === 'string') {
    console.log('is string');
    return item;
  }
  const { p: props = {}, c: children } = item;
  // tslint:disable-next-line variable-name
  const Tag =
    (options.components && item.t && options.components[item.t]) ||
    item.t ||
    options.DefaultComponent ||
    defaultProps.DefaultComponent;

  return (
    <Tag {...props} key={key}>
      {Array.isArray(children)
        ? children.map((child: ItemType, key) => renderItems(child, options, key))
        : renderItems(children, options)}
    </Tag>
  );
}

interface Props {
  text: string;
  components?: {
    [x: string]: ComponentType;
  };
}

// here we optimize structure just a little to have to smallest json possible
const createElement = (component: string, props: any, children: any) => {
  return {
    t: component,
    ...(props && Object.keys(props).length ? { p: props } : {}),
    ...(children ? { c: children } : {}),
  };
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeRaw)
  .use(rehypeReact, { createElement });

// tslint:disable-next-line function-name
export default function MdRenderer({
  text,
  components,
}: Props) {
  const processed = processor.processSync(text).contents;
  console.log(processed);

  const r = renderItems(processed, {
    ...defaultOptions,
    ...defaultProps,
    // force to mix components, as default one (Link) is crucial
    components: {
      ...defaultOptions.components,
      ...(components || {}),
    },
  });
  const DefaultComponent = defaultProps.DefaultComponent;
  return typeof r === 'string' ? <DefaultComponent>{r}</DefaultComponent> : r;
}
