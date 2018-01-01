import fs from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';
import url from 'url';
import remark from 'remark';
import stripMarkdown from 'strip-markdown';

const contentRoot = 'content';
const layoutMap = {
  Post: 'src/containers/Post',
  ListPage: 'src/containers/ListPage',
  Home: 'src/containers/Home',
};

function prune(s) {
  const trimmed = s.substr(0, 80);

  if (trimmed === s) {
    return s;
  }

  const lastIndex = Math.min(trimmed.length, trimmed.lastIndexOf(''));
  const sub = trimmed.substr(0, lastIndex);

  return `${sub}…`;
}

function makeDescription(text) {
  let str = text;
  const match = text.match(/<!--\s?desc\s?-->\s+(.*)/);
  if (match) {
    str = match[1];
  }

  const result = remark()
    .use(stripMarkdown)
    .processSync(str)
    .toString()
    .replace(/\n+/g, ' ') // Avoid useless new lines
    .trim();

  return prune(result);
}

/**
 * Recursively makes page info for React Static
 * 
 * @param {string} root Current directory
 * @param {string} filename Name of the file
 * @returns 
 */
async function makePage(root, filename) {
  const fullPath = path.resolve(__dirname, contentRoot, root, filename);
  const isDir = await fs.stat(fullPath).then(s => s.isDirectory());

  if (isDir) {
    // reccur
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

      const indexProps = await index.getProps();

      // Populate data prop with index's data
      data = {
        ...data,
        ...indexProps.data,
      };
      // eslint-disable-next-line prefer-destructuring
      text = indexProps.text;
    }

    const layout = (data.layout && layoutMap[data.layout]) || layoutMap.ListPage;

    // Get children
    const propArr = await Promise.all(values.map(v => v.getProps()));
    const children = propArr.map(p => p.data);

    data.children = children;

    return {
      type: 'dir',
      path: filename,
      component: layout,
      getProps: async () => ({
        name: filename,
        children,
        data,
        text,
      }),
      children: values,
    };
    // eslint-disable-next-line no-else-return
  } else {
    const fileNoExt = filename.match(/(.+)\.md$/)[1];
    const fileContents = await fs.readFile(fullPath, 'utf8');
    // Extract front matter
    const { data, content } = matter(fileContents);

    const id = data.id || fileNoExt;
    const idNoIndex = id === 'index' ? '' : id;

    // Props for page
    const props = {
      data: {
        ...data,
        url: url.parse(path.join('/', root, idNoIndex, '/')).href,
        description: makeDescription(content),
        filename,
        id,
      },
      text: content,
    };

    const layout = (data.layout && layoutMap[data.layout]) || layoutMap.Post;

    // Return child info
    return {
      type: 'page',
      path: props.data.id,
      component: layout,
      getProps: () => props,
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
  entry: path.join(__dirname, 'src', 'index.tsx'),
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx');

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    // eslint-disable-next-line no-param-reassign
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            loader: 'raw-loader',
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ];
    return config;
  },
};
