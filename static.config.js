import fs from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js');

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const dirPath = path.resolve(__dirname, './content/posts');
    const files = await fs.readdir(dirPath);

    const contentArray = files
      .filter(f => f.match(/.+\.md$/))
      .map((filename) => {
        const id = filename.match(/(.+)\.md$/)[1];
        const { data, content } = matter(fs.readFileSync(path.resolve(dirPath, filename), 'utf8'));
        return {
          data: {
            ...data,
            filename,
          },
          text: content,
          id,
        };
      });

    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/posts',
        component: 'src/containers/Blog',
        getProps: () => ({
          posts: contentArray.map(({ data }) => data),
        }),
        children: contentArray.map(({ data, text }) => ({
          path: `/${data.id}`,
          component: 'src/containers/Post',
          getProps: () => ({
            data,
            text,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
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
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ];
    return config;
  },
};
