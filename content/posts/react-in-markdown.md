---
title: Using React components in Markdown (Outdated)
layout: Post
date: 2017-06-26T16:50
edited: 2017-06-27T10:32
---

*An updated version of this post can be found here:*

<Post url="/posts/react-in-markdown-updated"></Post>

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

# Representing React components in Markdown

Since Markdown doesn't support React, you will need to represent your elements in some form. This template syntax will be replaced by your component in later steps. Here's two ideas, each with their own positive and negative points. Of course, you can use a different form, there's nothing stopping you. All it means is a different regular expression when you go to replace it.

**1. HTML syntax**

```md
<MyButton>Click Me!<MyButton>
<HelloWorld target="my friend" />
```

The HTML syntax is intuitive, as it appears in your Markdown exactly how you would write it in your Javascript files. It also helps readability, but this is neutral, as the only person who will ever read the raw Markdown is you.

If you use HTML syntax and parse the Markdown before replacing the component templates, then be aware that the case of the component names may change, based on the parser you use. Using a case-insensitive match will get past that easily.

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

There are a few options for which style of comments you use. There's not much difference in the end, as it only changes the regular expression you use to detect this. If your component has more than one property, then the top syntax won't be helpful, as you won't know where one prop finishes and the next starts. The second syntax is the closest to HTML/JSX syntax. The third puts the properties in a JSON object, which is useful for encoding more complex properties. Personally, I prefer the JSON syntax, as it is easier when it comes to getting the props from the regular expression.

If something goes wrong when rendering, using comments will have no impact on the end-user, as they won't see anything. Other than those, there's really no major differences between the two. Whatever you choose, be consistent.

For the rest of this post, I'll be using the JSON comment syntax.

# Rendering MD + React to HTML

Now that you have some way of representing your components in Markdown, it's time to turn it into HTML. Earlier in this post I mentioned that HTML is valid inside Markdown, so the goal here is to render the React content before passing the Markdown into whatever parser you are using. You can also render the components after the Markdown has been transformed into HTML. Which way you choose makes very little difference.

```js
function beforeParsing(md) {
  // Render React content in here
}

function parseMarkdown(md) {
  // Use whatever parser you fancy
}

let finalHTML = parseMarkdown(beforeParsing(initialContent));
```

The first step is to find any occurences of your template in the Markdown. Like with any string searching and manipulation, we're going to use regular expressions. The exact form of the expression depends on what your template looks like in the Markdown, but will probably check for the name of the component and capture the properties. The following expression is the one I'm using on this website. Note that the expression expects there to be properties. If the component doesn't have any, leave an empty object there.

```js
const templateRegex = /<!--\s?([-\w]+)\s([\s\S]+?)\s?-->/;
```

Once you have your pattern, search over the Markdown content, and replace each match with the appropriate rendered HTML output from React. While this sounds like a lot, it turns out to be a lot simpler than it otherwise seems.

```js
import ReactDOMServer from 'react-dom/server';
import MyButton from './MyButton';

// ...

function beforeParsing(md) {
  return md.replace(templateRegex, replaceonMatch);
}

function replaceonMatch(fullMatch, componentName, propsJsonString) {
  let props = JSON.parse(propsJsonString);
  let component;

  switch (componentName) {
    case 'MyButton':
      component = <MyButton>{props.text}</MyButton>;
      break;
    // ...
  }

  if (component) {
    return ReactDOMServer.renderToStaticMarkup(component);
  } else {
    // No matching component was found.
  }
}

// ...
```

And there you go! Using ReactDOM's server renderer, your components get transformed into HTML, which is then put into the Markdown content to be parsed.

# Rendering MD + React to React

That heading might seem strange at first. The idea behind it is pretty straight forward. By rendering your content to static HTML, you miss out on any interactivity or statefulness that your components might have. In some cases, this is fine. In others, not so much. Since the HTML created by ReactDOMServer is static, you will lose this interactability.

There are a couple of caveats with this method. You need to perform the replacement *after* the Markdown processor has done its work to avoid any potential script injection attacks. It also only works for "block-level" components, as you'll see later. Due to how React handles the insertion of raw HTML, using inline components is impossible.

```md
This paragraph uses an <!-- MyButton {"text":"inline button"} -->. It won't stay inline.

BECOMES:

<div>
  This paragraph uses an 
</div>
<MyButton>inline button</MyButton>
<div>
  . It won't stay inline.
</div>
```

First, split your input text into sections. Because of the block-level limitation, the best way is top split into paragraphs. Then, map any component templates to their element form. Next, I reccomend to group any strings together, which will reduce the number of element on the page. Finally, add the HTML strings by using `dangerouslySetInnerHTML`.

```js
// Note: you should have parsed the Markdown content, which is then given to this function
function reactify(html) {
  return html
    // Split into paragraphs
    .split(/\r?\n/g)
    .map((text) => {
      let match = text.match(templateRegex);
      if (match) {
        // This section has a template in it, let's convert it!
        let [fullMatch, component, propsJsonString] = match;
        let props = JSON.parse(propsJsonString);
        switch(component) {
          case 'MyButton':
            return <MyButton>{props.text}</MyButton>;
        }
      }

      // If nothing matched, return the text
      return text;
    })
    // This section reeduces the size of the array by concatenating any adjacent strings
    // e.g. ['1', '2', Object, '4', '5']
    // becomes ['1\n2', Object, '4\n5']
    // Doing this reduces the number of components that get rendered by React
    // Note that this function could be reduced in size. I've left it inflated for demonstration
    .reduce((arr, curr) => {
      if (typeof curr === 'string') {
        let last = arr[arr.length - 1];
        if (!last) {
          // Array is empty, so just add this as the first element
          arr.push(curr);
          return arr;
        } else if (typeof last === 'string') {
          // Previous item is a string, so concatenate it with this one
          let newLast = `${last}\n${curr}`;
          arr[arr.length - 1] = newLast;
          return arr;
        } else {
          // Previous item is not a string, so add this as the next item in the array
          arr.push(curr);
          return arr;
        }
      } else {
        // This item is an Element, so should not be concatenated
        arr.push(curr);
        return arr;
      }
    }, [])
    .map((item, index) => {
      if (typeof item === 'string') {
        // Add the HTML to a React div
        <div
          key={index}
          dangerouslySetInnerHTML={{__html: item}}/>
      } else {
        // This is already a React element, so just return it
        return item;
      }
    });
}
```

Then just render this array like you would any other array of React elements.

## Phenomic

The entire reason I started looking into using React components in Markdown was because I wanted to use it on this website. I use the React based website generator [Phenomic](https://phenomic.io) to make these pages.

*Note: this was written based on Phenomic 0.21.1. With 1.0 coming soon, this method may not work anymore. I will update the post if needed.*

In your project, you will likely have a `Page` component that takes, among others, a `body` property. It probably puts that body content into a `BodyContainer` as well. The BodyContainer takes a string of HTML and renders it. You could use the static HTML method of replacing the component, and call it done. However, if your component is interactive, the HTML version isn't going to cut the mustard.

As well as a plain HTML string, the BodyContainer also accepts an array of strings and Elements. If you split your initial markdown into `[HTML, component template, HTML, ...]` and replace your components in the array with the actual React component (not the rendered string), then the BodyContainer will render the plain HTML strings as normal, and will render your components as React components. This is exactly what the `reactify` function in the previous section does.

This leaves you with a two options:

1. Use the MD + React -> React method above, and forget about the BodyContainer
2. Use the BodyContainer to convert the HTML string sections to React, and render your components too

Option 1 is exactly the same as the method above. Just put that array as a child in the Page.

```js
// Page.js

// ...

return (
  <div className={styles.page}>
    {header}
    {isLoading ? <Loading /> : reactify(body)}
    {footer}
  </div>
);
```

Option 2 allows you to leave off the final `map` step of Option 1, as you can pass strings into the BodyContainer. This may be useful if you want to apply global styles to the `.phenomic-BodyContainer` CSS class.

```js
// Page.js

// ...

return (
  <div className={styles.page}>
    {header}
    {/* Note that reactify no longer includes that final `map` step */}
    {isLoading ? <Loading /> : <BodyContainer>reactify(body)</BodyContainer>}
    {footer}
  </div>
);
```

Phenomic will still create a static HTML version of your page, which will now inluce your react components, so make sure your components display something at that stage.

---

As always, if you have any questions about using React components in Markdown, or have found any errors in this post, please let me know.
