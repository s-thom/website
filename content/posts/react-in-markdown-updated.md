---
title: Using React components in Markdown
layout: Post
date: 2017-11-12T09:20
---

Since a fair bit has changed in my apporach since [the last post](/posts/react-in-markdown), I thought I'd go through and rewrite the entire thing.

The Markdown specification allows you to write HTML inside the Markdown file, and that HTML will be rendered in the final page.

```md
This is valid Markdown

<button>Click Me!</button>

However, this doesn't quite work when you're using custom React components.
Instead of it rendering your fancy React-based component, you'll end up with a `<mybutton>` HTML element (which isn't valid HTML).

```md
This is not valid Markdown

<MyButton>Click Me Instead!</MyButton>
```

I wanted to be able to use React components in Markdown, which set me on a journey of discovery. This post is here to help you if you happen to embark on it as well.

# Representing React components in Markdown

Previously I had a decent sized section on different ways of representing React Components in Markdown and then matching them to get the component name and props, but that has changed. It's really easy now.

```md
All you need to do is write out your element.

<Post url="/posts/react-in-markdown-updated/"></Post>

Just like you would in JSX
```

Which, by the way, gives this output on my site:

> All you need to do is write out your element.
>
> <Post url="/posts/react-in-markdown-updated/"></Post>
>
> Just like you would in JSX

There are two restrictions with this, though: 

1. You need to include the closing tag (`</Post>` in this case). Void tags (e.g. `<Post url="..." />`) are not recognised properly, and will cause DOM nesting errors.
2. All props must be strings. 

# Rendering MD + React

There is always a level of inherent complexity whenever you try to do anything. 

## Markdown Processor

For this website, I use [unified](https://unifiedjs.github.io), and its plugins, to parse and process the Markdown. Unified has two relevant syntaxes, namely [remark](https://github.com/wooorm/remark) and [rehype](https://github.com/wooorm/rehype). These handle the parsing and stringifying of Markdown and HTML respectively.

```js
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

// ...

const processor = unified()
  .use(remarkParse) // Converts text to a mdast tree
  // Add any remark plugins here
  .use(remarkRehype, { allowDangerousHTML: true }) // Converts mdast tree to nclst
  // Add any rehype plugins here
  .use(rehypeReact); // Converts to React
```

`processor` will take the Markdown text for the page, and then output something as defined by the createElement function we give it.

## Rendering to a Page

Now, make a React component and render the output.

```js
import React from 'react';
// ...

// ...
// (Above snippet goes here)
// ...

export default function MdRenderer({
  text,
}) {
  const processed = processor.processSync(text).contents;
  return <div className="">{processed}</div>;
}
```

And you're good to go! Almost.

Now you have plain Markdown being converted to React, but *no custom elements* just yet. They will appear as (invalid) HTML elements on your page, which is not the desired effect.

## Inspiration

While trying to get custom elements to work, I kept hitting the same brick wall. The components just did not want to render. I took a step back, and decided to search around and see how this problem had been appreached by other people.

I ended up looking at [Phenomic](https://github.com/phenomic/phenomic), a static website generator that had just added the ability to use React elements in Markdown. 

Phenomic splits the rendering stage into two parts: the [build stage](https://github.com/phenomic/phenomic/blob/master/packages/plugin-transform-markdown/src/transformer.js), and the [render stage](https://github.com/phenomic/phenomic/blob/master/packages/plugin-renderer-react/src/components/BodyRenderer.js).

### The Build Stage

Since Phenomic is moving to a platform/library/format-agnostic model (where you will be able to use any markup format with any client library), it needs to use its own internal representation of the information. Since this is the build stage, this information needs to be included in the page when it is statically rendered. This ensures that the initial state of the client renderer is in sync with what is displayed statically without Javascript.

The `rehype-react` plugin allows you to specify the `createElement` function it uses to render. In Phenomic, this is hijacked to create a JSON representation of the page, which is then included in the HTML file.

```js
// Creates structure like this:
// {
//   t: 'Tag name',
//   p: 'Props object (optional)',
//   c: 'Children (optional),'
// }
function createElement(component, props, children) {
  return {
    t: component, // String name of the component
    ...(props && Object.keys(props).length ? { p: props } : {}), // Adds in props if defined
    ...(children ? { c: children } : {}) // Add in children if defined
  };
};

const processor = unified()
  // ...
  .use(rehypeReact, { createElement }); // Converts to object now, instead of React
```

The short names (`t`, `p`, `c`) are used instead of the full names to reduce the size of the JSON output (and therefore the download size/time of the final page).

### The Render Stage

The object created in the build stage is passed on to a React component to render. However, React doesn't understand this minimal JSON representation, so it must be turned back.

At this stage, the custom components can be added. A simple object mapping of strings to Components is added. However, since the Markdown went through an HTML parser (rehype), all tags have been converted to lowercase, so the keys in the mapping should also be in lowercase.

```js
import MyComponent from '...';

// ...

const componentMap = {
  tagname: MyComponent,
};
```

Finally, the small representation of the elements is converted into full React elements.

```js
// ...

function render(
  item, 
  components,
  key,
) {
  if (!item) {
    return null;
  }

  // Strings on their own are still valid, and must be handled
  if (typeof item === 'string') {
    return item;
  }

  const { p: props = {}, c: children } = item;
  const Tag =
    (components && item.t && components[item.t]) || // Check component map first
    item.t ||
    'div'; // Default to <div>

  return (
    <Tag {...props} key={key}>
      {Array.isArray(children)
        ? children.map((child, key) => renderItems(child, components, key))
        : renderItems(children, components)}
    </Tag>
  );
}
```

And then display the result of the `render` function.

This solution ended up solving the problem I had where custom elements refused to render, so I've used it on this website.

## Putting it All Together

For this website, I took the parts above, and put them together to render markdown content. The following is close to [what I actually use](https://github.com/s-thom/website/blob/develop/src/components/MdRenderer/index.tsx) (because this website uses Typescript), and should hopefully make sense.

Only one major change happens: The `MdRender` component has a `components` prop that allows for more components to be added.

```js
import React from 'react';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

import MyComponent from '...';

const defaultComponents: ComponentMap = {
  tagname: MyComponent,
};

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHTML: true })
  .use(rehypeReact, { createElement });

function renderItems(
  item, 
  components,
  key
) {
  if (!item) {
    return null;
  }

  if (typeof item === 'string') {
    return item;
  }

  const { p: props = {}, c: children } = item;
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

function createElement(component: string, props: any, children: any) {
  return {
    t: component,
    ...(props && Object.keys(props).length ? { p: props } : {}),
    ...(children ? { c: children } : {}),
  };
}

export default function MdRenderer({
  text,
  components,
}) {
  const processed = processor.processSync(text).contents;
  const r = renderItems(
    processed, 
    {
      // Mixes the default components and the ones passed in through props
      ...defaultComponents,
      ...(components || {}),
    },
  );
  return typeof r === 'string' ? <div>{r}</div> : r;
}
```
