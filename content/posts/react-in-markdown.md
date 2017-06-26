---
title: Using React components in Markdown
layout: Post
date: 2017-06-26T16:50
---

The Markdown specification allows you to write HTML inside the Markdown file, and that HTML will be rendered in the final page. It's a useful feature, and one I [have used for this website](https://github.com/s-thom/website/tree/master/webpack/img-wrapper.js).

```md
This is valid Markdown

<button>Click Me!</button>
```

However, this doesn't quite work when you're using custom React components.
Instead of it rendering your fancy React-based component, you'll end up with a `<mybutton>` HTML element (which isn't valid HTML).

```md
This is not valid Markdown

<MyButton>Click Me Instead!</MyButton>
```


I wanted to be able to use React components in Markdown, which set me on a journey of discovery. This post is here to help you if you happen to embark on it as well.

# Rendering React components to HTML

## Markdown

Before going much further, you need to decide how your React components will look in your Markdown. Here's two ideas, each with their own positive and negative points.

**1. HTML syntax**

```md
<MyButton>Click Me!<MyButton>
<HelloWorld target="my friend" />
```

The HTML syntax is intuitive, as it appears in your Markdown exactly how you would write it in your Javascript files. It also helps readability, but this is neutral, as the only person who will ever read the raw Markdown is you.

**2. Comments**

```md
<!-- MyButton Click Me! -->
<!-- HelloWorld my friend -->

OR

<!-- MyButton text="Click Me" -->
<!-- HelloWorld target="my friend" -->

OR

<!-- MyButton {"text":"Click Me!"} -->
<!-- HelloWorld {"target":"my friend"} -->
```

There are a few options for which style of comments you use. There's not much difference in the end, as it only changes the regular expression you use to detect this. If your component has more than one property, then the top syntax won't be helpful, as you won't know where one prop finishes and the next starts. The second syntax is the closest to HTML/JSX syntax. The third puts the properties in a JSON object, which is useful for encoding more complex properties.

There is one main reason why you would use comments: if something goes wrong when rendering, it will have no impact on the end-user. Other than that, there's really no difference. Whatever you choose, be consistent.

## Javascript

Now that you have some way of representing your components in Markdown, it's time to turn it into HTML. Earlier in this post I mentioned that HTML is valid inside Markdown, so the goal here is to render the React content before passing the Markdown into whatever parser you are using.

```js
function beforeParsing(md) {
  // Render React content in here
}

function parseMarkdown(md) {
  // Use whatever parser you fancy
}

let finalHTML = parseMarkdown(beforeParsing(initialContent));
```

The first step is to find any occurences of your template in the Markdown. Like with any string searching and manipulation, we're going to use regular expressions. The exact form of the expression depends on what your template looks like in the Markdown, but will probably check for the name of the component and capture the properties.

Once you have your pattern, search over the Markdown content, and replace each match with the appropriate rendered HTML output from React. While this sounds like a lot, it turns out to be a lot simpler than it otherwise seems.

```js
import ReactDOMServer from 'react-dom/server';

function beforeParsing(md) {
  return md.replace(/* Put your matching pattern here */, replaceonMatch);
}

function replaceonMatch(fullMatch, captureGroup1, captureGroup2 /* ... */) {
  let myComponent = (
    <MyButton>
      <HelloWorld target={captureGroup1} />
    </MyButton>
  );

  return ReactDOMServer.renderToStaticMarkup(myComponent);
}

// ...
```

And there you go! Using ReactDOM's server renderer, your components get transformed into HTML, which is then put into the Markdown content to be parsed.

# Extension: React in Markdown with Phenomic

[Phenomic](https://phenomic.io) is a Markdown-based website generator that uses React to build the pages.

*Note: this was written based on Phenomic 0.21.1. With 1.0 coming soon, this method may not work anymore. I will update the post if needed.*

The basic principle remains the same: turn a representation of your component in the Markdown into the HTML content. However, the method for doing it is a little different.

In your project, you will likely have a `Page` component that takes, among others, a `body` property. It probably puts that body content into a `BodyContainer` as well. The BodyContainer takes a string of HTML and renders it. You could use the above method and replace your template with the HTML representation, and call it done. It will work. However, if your component is interactive, inserting the static HTML won't be good enough. Luckily, the BodyContainer can help.

As well as a plain HTML string, the BodyContainer also accepts an array of strings and Elements. If you split your initial markdown into `[HTML, component template, HTML, ...]` and replace your components in the array with the actual React component (not the rendered string), then the BodyContainer will render the plain HTML strings as normal, and will render your components as React components.

In the static website build, this will produce the same HTML as replacing your template. However, once it is running inside the browser, it is rendering the actual component which will be interactable.

This is quite powerful, as it allows you to use components, such as interactive charts, directly in your website. It allows any website using Phenomic, a static website generator, to include fully dynamic content.

---

As always, if you have any questions about using React components in Markdown, or have found any errors in this post, please let me know.
