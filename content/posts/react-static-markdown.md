---
title: Using Markdown with React Static
layout: Post
date: 2017-11-23T15:45
edited: 2018-05-20T11:48
---

*Edit (20 May 2018): Updated to support React Static 5.0.0+*

---

My website uses the React Static framework to generate static HTML versions of its pages, as well as a dynamic JS version that runs in the browser. Configuration is done using a `static.config.js` in the root directory. This file tells React Static which routes exist on the website, as well as a few other details.

This post shows how I have set up my `static.config.js` to search for pages, and pass the appropriate properties to the Components.

# Table of Contents

# Code First, Explain Later

## The Code

Since the code is around 120 lines, I've put it in an expandable section. This version is a little bit reduced for simplicity (such as removing the Webpack config for Typescript).  The latest version of this file can be [found on GitHub](https://github.com/s-thom/website/blob/develop/static.config.js).

<Expandable title="Code for building routes">

```js
import fs from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';
import url from 'url';

const contentRoot = 'content';
const layoutMap = {
  Post: 'src/containers/Post',
  ListPage: 'src/containers/ListPage',
  Home: 'src/containers/Home',
};

async function makePage(root, filename) {
  const fullPath = path.resolve(__dirname, contentRoot, root, filename);
  const isDir = await fs.stat(fullPath).then(s => s.isDirectory());

  if (isDir) {
    const files = await fs.readdir(fullPath);
    const newRoot = path.join(root, filename);

    const promises = files.map(f => makePage(newRoot, f));

    let values = await Promise.all(promises);

    let data = {
      title: filename,
      url: url.parse(path.join('/', root, filename, '/')).href,
      description: '',
      filename,
      id: filename,
    };
    let text = '';

    const index = values.find(v => v.path === 'index');
    if (index) {
      values = values.filter(v => v !== index);

      const indexProps = await index.getData();

      data = {
        ...data,
        ...indexProps.data,
      };
      text = indexProps.text;
    }

    const layout = (data.layout && layoutMap[data.layout]) || layoutMap.ListPage;

    const propArr = await Promise.all(values.map(v => v.getData()));
    const children = propArr.map(p => p.data);

    data.children = children;

    return {
      type: 'dir',
      path: filename || '/',
      component: layout,
      getData: async () => ({
        name: filename,
        children,
        data,
        text,
      }),
      children: values,
    };
  } else {
    const fileNoExt = filename.match(/(.+)\.md$/)[1];
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const id = data.id || fileNoExt;
    const idNoIndex = id === 'index' ? '' : id;

    const props = {
      data: {
        ...data,
        url: url.parse(path.join('/', root, idNoIndex, '/')).href,
        description: '',
        filename,
        id,
      },
      text: content,
    };

    const layout = (data.layout && layoutMap[data.layout]) || layoutMap.Post;

    return {
      type: 'page',
      path: props.data.id,
      component: layout,
      getData: () => props,
    };
  }
}

export default {
  getSiteProps: () => ({}),
  getRoutes: async () => {
    const topRoute = await makePage('', '');

    return [
      topRoute,
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
  siteRoot: 'https://sthom.kiwi',
};
```

</Expandable>

## Explanation

Before going any further, I'll give a quick explanation of what this file does.

Each time the website is built (i.e. pushing to your server) the exports from this file are used by React Static to actually do the build. This file can be used to extend the webpack config, allowing for near full control of the process. The main thing of note is the `getRoutes` function, which tells React Static which routes exist in the website and should be rendered.

### Exports

The `getRoutes` function returns (a Promise of) an array of route info. Each route has the following properties:

```js
{
  path: 'react-static-markdown', // Final section of the url, e.g. react-static-markdown in /posts/react-static-markdown/
  component: './src/components/Post', // React Component to render this page with

  // Optional

  children: [], // List of pages underneath this one in the heirarchy
  getData: () => ({}), // Props for this page. Can be async (or return a Promise)
}
```

### makePage()

Since this is the main function of the file (finding files and creating routes), I'll be splitting it up into more managable sections to explain.

#### Constants

Outside of the `makePage` function are a couple of consants. The contentRoot is the directory where the markdown files can be found. The layout map is a mapping of names to Component paths, which is used to specify which component should display the page.

```js
const contentRoot = 'content';
const layoutMap = {
  Post: 'src/containers/Post',
  ListPage: 'src/containers/ListPage',
  Home: 'src/containers/Home',
};
```

#### Start

Since this is a recursive solution, we need to know whether the current 'file' is a Markdown document or a directory. Here I'm using the [`fs-extra` package](https://www.npmjs.com/package/fs-extra), which returns Promises if the callback isn't present. Otherwise, it's (almost) the same as Node's builtin `fs`.

```js
import fs from 'fs-extra';
import path from 'path';

// ...

const fullPath = path.resolve(__dirname, contentRoot, root, filename);
const isDir = await fs.stat(fullPath).then(s => s.isDirectory());

if (isDir) {
  // ...
} else {
  // ...
}
```

#### Files

If the current file is actually a file, then it needs to be parsed. The first step is to extract any [grey matter](https://github.com/jonschlinkert/gray-matter) from the top of the file. This means properties can be specified for the file, which I use for the page title, edit time, image/colour, and more.

```js
import matter from 'gray-matter';

// ...

const fileNoExt = filename.match(/(.+)\.md$/)[1];
const fileContents = await fs.readFile(fullPath, 'utf8');
// Extract front matter
const { data, content } = matter(fileContents);

const id = data.id || fileNoExt;
const idNoIndex = id === 'index' ? '' : id; // Avoid /thing/index/ urls
```

I also create a couple of variables for the ID. The ID can be specified in the grey matter of the Markdown document, or defaults to the filename. The ID is used for the URL, so I also create a "no index" variable so directory URLs will be `/` instead of `/index`

The next step is to create the props for the final page. The `data` prop contains all the meta information about the page, and the `text` property is the actual Markdown content.

```js
import path from 'path';
import url from 'url';

// ..

// Props for page
const props = {
  data: {
    ...data, // From the grey matter
    // And overwrite with these values
    url: url.parse(path.join('/', root, idNoIndex, '/')).href,
    description: '', // Make a description for your pages
                     // Could be just the first n characters of the text
    filename, // Original filename (e.g. react-static-markdown.md)
    id, // And the ID (usually filename without extension)
  },
  text: content,
};

// Get layout from map, or use default (Post)
const layout = (data.layout && layoutMap[data.layout]) || layoutMap.Post;

// Return child info
return {
  type: 'page',
  path: props.data.id,
  component: layout,
  getData: () => props,
};
```

And that's the route data for a normal page.

#### Directories

The first step of this process is to get the values of each file in the directory. This may include more directories, but will eventually stop.

```js
const files = await fs.readdir(fullPath);
const newRoot = path.join(root, filename);

let values = await Promise.all(files.map(f => makePage(newRoot, f)));
```

Directories are still valid pages and can still have content (such as a description of its child pages). This block sets up the defaults, in case there is no `index.md` to get the content from.

```js
// Default props for a directory
let data = {
  title: filename,
  url: url.parse(path.join('/', root, filename, '/')).href,
  description: '',
  filename,
  id: filename,
};
let text = '';
```

If there is an `index.md`, then use its props for this page, and remove it from the list. Now that the props have been set, the layout can be retreived from the mapping.

```js
// Overwrite props with index
const index = values.find(v => v.path === 'index');
if (index) {
  values = values.filter(v => v !== index);

  const indexProps = await index.getData();

  data = {
    ...data, // Use defaults as a base
    ...indexProps.data, // Overwrite with index
  };
  text = indexProps.text; // Overwrite text
}

// Get layout from amp, or uise default (ListPage)
const layout = (data.layout && layoutMap[data.layout]) || layoutMap.ListPage;
```

The children need to be included in the component props, so I resolve the getData() for each of the child pages, and add that to the props for this page.

```js
const propArr = await Promise.all(values.map(v => v.getData()));

return {
  type: 'dir',
  path: filename || '/',
  component: layout,
  getData: async () => ({
    name: filename,
    children: propArr,
    data,
    text,
  }),
  children: values,
};
```

And that's directories complete.

# Wrapup

With this setup, Markdown files are being read from the `content` directory, including grey matter, then passed through to React Components as properties. The next step is to take the Markdown and render it to React. I've already written a post on doing this, which you can find here, including how to include your own React components in Markdown:

<Link url="/posts/react-in-markdown-updated/" title="React in Markdown"></Link>
