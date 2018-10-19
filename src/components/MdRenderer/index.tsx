import React from 'react';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import rehypeRaw from 'rehype-raw';
import remarkToc from 'remark-toc';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

import Link from '../Link';
import MdImage from '../MdImage';
import MdPostHeader from '../MdPostHeader';
import MdBigLink from '../MdBigLink';
import MdSpoiler from '../MdSpoiler';
import MdExpandable from '../MdExpandable';
import MdTooltip from '../MdTooltip';

type ComponentType = string | React.ComponentType<any>;

interface ComponentMap { 
  [x: string]: ComponentType;
}

interface Props {
  text: string;
}

const components: ComponentMap = {
  a: Link,
  img: MdImage,
  post: MdPostHeader,
  link: MdBigLink,
  spoiler: MdSpoiler,
  expandable: MdExpandable,
  tooltip: MdTooltip,
};

const processor = unified()
  .use(remarkParse)
  .use(remarkToc)
  .use(remarkEmoji)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings)
  .use(rehypeHighlight)
  .use(rehypeRaw)
  .use(rehypeReact, { createElement });

function createElement(component: string, props: any, children: any) {
  const Tag =
    (components && component && components[component]) ||
    component ||
    'div';

  return (
    <Tag {...props}>
      {children}
    </Tag>
  );
}

// tslint:disable-next-line function-name
export default function MdRenderer({
  text,
}: Props) {
  return (
    <div className="MdRenderer">
      {processor.processSync(text).contents}
    </div>
  );
}
