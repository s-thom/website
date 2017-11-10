---
title: How this website is built
layout: Post
img: /assets/posts/this-website/banner.png
date: 2017-06-01T21:10
edited: 2017-06-26T16:37
---

Knowing how to write code gives a certain luxury: being able to make your own website. It is simple enough to go with a WYSYWG editor (there are certainly many of those these days), or to get a template-based website with hundreds of PHP plugins. However, there's something missing with those. I like to get my hands into code, to play around and experiment. If everything is hidden behind a drag/drop interface or a 1-click button, then there's no way for me to get stuck in.

# React and server side rendering

I had played with the [React framework](https://facebook.github.io/react/) and [react-router](https://github.com/ReactTraining/react-router) for a [different project](https://github.com/SecretOnline/Info-Repo) in the past. Being able to declare the UI inside Javascript turned out to be very useful when building a page based on a dataset that could change at any time. Being relatively new to development, I hold no pre-existing negative feelings towards Javascript, especially with the additions that came with ES6.

**"Hello World" in React's declarative style**

```jsx
// HelloWorld.js
import React from 'react';

export default class HelloWorld extends React.Component {
  render() {
    let target = this.props.target || 'World';

    return (
      <p>{`Hello ${target}!`}</p>
    );
  }
}

// Main.js
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';

ReactDOM.render(
  <HelloWorld target="my friend" />,
  document.getElementById('root')
);
```

React also allows the creation of elements using functions, which reduces the amount of noise required in the code. In addition, it forces you to write pure components that don't hold state.

```jsx
// HelloWorld.js
import React from 'react';

export default function HelloWorld(props) {
  let target = props.target || 'World';

  return (
    <p>{`Hello ${target}!`}</p>
  );
}
```

The thing that intrigued me the most about React was server side rendering. In a normal React page, the browser is sent an HTML document that has very little content. Usually it's just an empty page. The browser must then load the page's script, run it, and then finally the user sees a page. That's bad for the user. If you have a particularly large script, then you either make the user wait a long time, or mess with code splitters (which only makes you curse at webpack).

There is also one rather major problem with this. NoScript. If the user has disabled Javascript, then all they will ever see is that blank page. That's not a good look for your website.

Server side rendering does away with both of these problems. The browser gets a full page, which it can start displaying right away, just like any webpage. If the user doesn't use scripts, that's it! They see a normal page, and can click links to view the next pages (which are also rendered server side too). If scripts are enabled, then the page functions as a normal React app, usually resulting in quicker "page" loads past the first load.

![Excerpt of the rendered content of this page](/assets/posts/this-website/server-side-render.png)

# Phenomic

Getting React to work on the server side is no problem. It's just a matter of rebuilding each page when you want to update your site. 

The problem is [Webpack](https://webpack.js.org/). While webpack is amazing tool that allows you to do a lot (write your scrips in a modular way (much better for development), but use them like a normal web script (i.e. in one bundle)), it is incredibly annoying to configure. 

Enter [Phenomic](https://phenomic.io/): a website generator based on React, supports server side rendering, and still provides fancy navigation with Javascript enabled. At its core, all it provides is the framework to build upon. Upon installing it also gives you a template, but you can completely ignore that if you like. 

One of the features I added was a date to the top of posts. It will also show the date that a post was edited, if it was. This information comes from the front matter, a section of the source document that specifies some values. Another feature are the breadcrumbs: links back to pages higher up the website tree.

![The header of this page. The date is shown on the right, while breadcrumbs link back to other pages](/assets/posts/this-website/header-timestamp.png)

The framework allows you to write your pages in [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) (which made writing this post a lot easier than typing `<p></p>` all over the place), and transforms that into the HTML to be rendered. With that rendered HTML, you put it into a page. Like any React app, that's as simple as adding it as a child of your `Page` object. Of course, you probably want more than that. For example, of the [homepage](/) I have two lists. Those, obviously, aren't specified in Markdown. Instead, they're in the [HomePage object](https://github.com/s-thom/website/blob/develop/src/pages/HomePage/index.js#L33).

## Custom plugins

As well as allowing you to just create your layout, you can specify your own plugins to interact directly with the webpack side of Phenomic. I wrote three at the beginning of this site. 

1. [description.js](https://github.com/s-thom/website/blob/develop/webpack/description.js)  
  Phenomic extracts `<meta name="description" />` tags from the top of the page. The decription plugin allows you to add `<!-- desc -->` to specify where it should draw the description from instead. Since Markdown supports HTML, the comment doesn't show in the final site.
2. [img-wrapper.js](https://github.com/s-thom/website/blob/develop/webpack/img-wrapper.js)  
  This plugin takes all markdown images on the page and wraps them (and their caption) in a `<figure>`. It also makes sure there is an `alt` attribute on the image for accessibility.
3. [md-plugin.js](https://github.com/s-thom/website/blob/develop/webpack/md-plugin.js)  
  Phenomic's Markdown parser ([Remark](https://github.com/wooorm/remark)) is hidden behind a couple of layers, making it impossible to add any new plugins. I created a new Phenomic plugin so that I could use different Remark plugins. I could also switch to a different Markdown parser if I wanted to. What Remark plugin did I add? Emoji :+1:.

In addition, I have added a way for me to use certain React elements in the Markdown. To avoid making this post too long, I've put it in its own post, since there's a few details to go over.

<Post url="/posts/react-in-markdown/"></Post>

Yes, that box is an example of an element created by React being defined in Markdown.

# Why this website is open source

*(In case you haven't clicked any of the relevant links on the page yet, here's [a link to the repository](https://github.com/s-thom/website/))*

"Stuart, ", you might ask, "why is your website open? What purpose could that possibly hold?".

It comes down to the fact that if something has been done before, it will be done again. I have spent several hours typing away, modifying, adding bugs, and fixing those bugs again that I want to show how I solved those problems. There have been many times where I have referenced other people's code (and sometimes a *little more* than referencing) to figure ot a solution. 

Since I have come across issues in creating this website, I wanted to share my solutions, and have them there for those who need them. If you have any questions about any part of the website's repository and why I've made some of the decisions I have, ask away. If you have any suggestions as to how it can be improved, then let me know. Collaboration is what open source software is about.
