import fs from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js');

function errLog(returnValue = null) {
  return (err) => {
    console.error(err);
    return returnValue;
  };
}

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const contentRoot = './content';
    const directories = [
      'posts',
      'projects',
    ];

    // TODO: meta.json in dir?

    const promises = directories
      .map(async (dir) => {
        const dirPath = path.resolve(__dirname, contentRoot, dir);
        const files = await fs.readdir(dirPath);

        const promArray = files
          .filter(f => f.match(/.+\.md$/))
          .map(async (filename) => {
            const id = filename.match(/(.+)\.md$/)[1];
            const fileContents = await fs.readFileSync(path.resolve(dirPath, filename), 'utf8');
            const { data, content } = matter(fileContents);

            return {
              data: {
                ...data,
                url: path.join('/', dir, filename, '/'),
                filename,
                id,
              },
              text: content,
            };
          })
          .map(p => p.catch(() => null))
          .filter(f => f);

        const posts = await Promise.all(promArray);
        return {
          posts,
          dir,
          dirPath,
        };
      })
      .map(p => p.catch(() => []));

    const folders = await Promise.all(promises);
    const lists = folders
      .map(({ posts, dir }) => ({
        path: `/${dir}`,
        component: 'src/containers/ListPage',
        getProps: () => ({
          name: dir,
          posts: posts.map(({ data }) => data),
        }),
        children: posts.map(props => ({
          path: props.data.id,
          component: 'src/containers/Post',
          getProps: () => props,
        })),
      }));
    const folderMap = folders.reduce((p, c) => {
      p[c.dir] = c.posts;
      return p;
    }, {});

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getProps: () => ({
          lists: folderMap,
        }),
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      ...lists,
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
  siteRoot: 'https://sthom.kiwi',
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx');

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = typescriptWebpackPaths.resolve.alias;

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
