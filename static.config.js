import fs from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';
import remark from 'remark';
import html from 'remark-html';

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js');

export default {
  getSiteProps: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const remarkParser = remark().use(html);
    const dirPath = path.resolve(__dirname, './content/posts');
    const files = await fs.readdir(dirPath);

    const contentArray = files.map((file) => {
      const { data, content } = matter(fs.readFileSync(path.resolve(dirPath, file), 'utf8'));
      const { contents } = remarkParser.processSync(content);
      return {
        data: {
          ...data,
          filename: file,
        },
        contents,
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
        children: contentArray.map(({ data, contents }) => ({
          path: `/${data.filename}`,
          component: 'src/containers/Post',
          getProps: () => ({
            data,
            contents,
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
