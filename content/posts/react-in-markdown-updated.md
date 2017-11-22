---
title: Using React components in Markdown
layout: Post
date: 2017-11-12T09:20
edited: 2017-11-22T15:45
---

*Edit (22 Nov 2017): Major post restructure. Simplified things a lot by removing a redundant step. Also changed the example slightly*

---

Since a fair bit has changed in my apporach since [the last post](/posts/react-in-markdown), I thought I'd go through and rewrite the entire thing.

The Markdown specification allows you to write HTML inside the Markdown file, and that HTML will be rendered in the final page. However, this is static HTML, with no interactivity. This post shows a way to include React elements in Markdown, and will most likely work for other systems too.

# Table of Contents

# Code First, Explain Later

## The Code

```js
// MdRenderer.jsx

import React from 'react';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

const components = {
  // A mapping of tag names (lower case) to Components
  // e.g.
  mycomponent: MyComponent
};

const processor = unified()
  .use(remarkParse)
  // Place any remark plugins here
  .use(remarkRehype, { allowDangerousHTML: true })
  // Place any rehype plugins here
  .use(rehypeReact, { createElement });

function createElement(component, props, children) {
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

export default function MdRenderer({ text }) {
  return (
    <div className="MdRenderer">
      {processor.processSync(text).contents}
    </div>
  );
}
```

## Explanation

### Use in Markdown

It's extremely simple to use in Markdown:

```md
This is a **Markdown** file

<MyComponent propName="prop value"></MyComponent>
```

There are three things to keep in mind:

1. You need to include the closing tag (`</MyComponent>` in this case).  
  Custom void tags (e.g. `<MyComponent propName="..." />`) are not recognised properly by rehype, and will cause DOM nesting errors.  
  Valid HTML void tags (like `<input>` and `<img>`) still work.
2. All props must be strings.
3. Element/Component names are case-insensitive.  
  rehype, used by the processor to manage HTML, puts all tag names in lowercase.  
  In this post, I type React components in UpperCamelCase to distinguish them from HTML elements.

### Markdown Processor

I use [unified](https://unifiedjs.github.io/) and its syntaxes [remark](https://github.com/wooorm/remark) and [rehype](https://github.com/wooorm/rehype) to parse the Markdown. There is a large number of plugins available for this ecosystem, allowing you to add more features in (like [emoji :+1:](https://github.com/rhysd/remark-emoji)).

```js
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

// ...

const processor = unified()
  .use(remarkParse)
  // Place any remark plugins here
  .use(remarkRehype, { allowDangerousHTML: true })
  // Place any rehype plugins here
  .use(rehypeReact, { createElement });
```

Using unified is simple enough, just `use()` any plugins you need. These three are neccesary, so make sure they're included.

* remark-parse  
  Transform Markdown into mdast tree (for remark plugins)
* remark-rehype  
  Transform mdast tree into nlcst tree (for rehype plugins)
* rehype-react  
  Transform nlcst tree into React tree

### createElement()

The rehype-react plugin converts the output from the rehype plugins into fully rendered React elements. It does this using React's [createElement](https://github.com/facebook/react/blob/master/packages/react/src/ReactElement.js#L175) function. However, it does not know about your custom components. In order to actually be able to use custom components, we need to override the createElement function to allow the components.

```js
import React from 'react';

// ...

function createElement(component, props, children) {
  const Tag =
    (components && component && components[component]) || // Get component from map if present
    component || // Otherwise just the string
    'div'; // Default to div

  // And return the formed component
  return (
    <Tag {...props}>
      {children}
    </Tag>
  );
}
```

### MdRenderer Component 

This is just a small pure functional component that takes a `text` property and returns the fully rendered page.

```js
export default function MdRenderer({ text }) {
  return (
    <div className="MdRenderer">
      {processor.processSync(text).contents}
    </div>
  );
}
```

And that's it; React in Markdown. This method works with server-side rendering/pre-rendering too, making it useful for nearly all purposes.

# Example

This post you're reading is [using the very code](https://github.com/s-thom/website/blob/develop/src/components/MdRenderer/index.tsx) shown here. This post doesn't use any of the custom Components I use on this website, so I thought I'd include an example at the bottom.

```md
All you need to do is write out your element.

<Expandable>
  <Link url="/posts/react-in-markdown-updated/" title="This Post"></Link>
</Expandable>

Just like you would in JSX
```

Becomes:

All you need to do is write out your element.

<Expandable>
  <Link url="/posts/react-in-markdown-updated/" title="This Post"></Link>
</Expandable>

Just like you would in JSX
