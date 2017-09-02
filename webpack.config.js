import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const nodeModules = path.join(process.cwd(), 'node_modules');
module.exports = (config = {}) => {
  return {
    entry: {
      [config.bundleName]: [
        process.env.PHENOMIC_ENV !== 'static' &&
        require.resolve('webpack-hot-middleware/client'),
        process.env.PHENOMIC_ENV !== 'static' &&
        require.resolve('react-hot-loader/patch'),
        './App.js'
      ].filter(item => item)
    },
    output: {
      publicPath: '/', // @todo make this dynamic
      path: path.join(process.cwd(), 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [require.resolve('@phenomic/babel-preset')],
            plugins: [require.resolve('react-hot-loader/babel')]
          }
        },

        // *.css => CSS Modules
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          include: path.resolve(__dirname, 'src'),
          loader: ExtractTextPlugin.extract({
            // @ts-ignore
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  minimize: config.production,
                  sourceMap: config.dev,
                  modules: true,
                  localIdentName: (
                    config.production
                      ? '[hash:base64:5]'
                      : '[path][name]--[local]--[hash:base64:5]'
                  ),
                },
              },
            ],
          }),
        },
        // *.global.css => global (normal) css
        {
          test: /\.global\.css$/,
          include: path.resolve(__dirname, 'src'),
          loader: ExtractTextPlugin.extract({
            // @ts-ignore
            fallback: 'style-loader',
            use: [
              'css-loader',
            ],
          }),
        },

        // copy assets and return generated path in js
        {
          test: /\.(html|ico|jpe?g|png|gif|eot|otf|webp|ttf|woff|woff2)$/,
          loader: 'file-loader',
          query: {
            name: '[path][name].[hash].[ext]',
            context: path.join(__dirname, 'src'),
          },
        },

        // svg as raw string to be inlined
        {
          test: /\.svg$/,
          loader: 'raw-loader',
        },
      ]
    },
    plugins: [

      new ExtractTextPlugin({
        filename: 'styles.css',
        disable: process.env.PHENOMIC_ENV !== 'static'
      }),
      process.env.PHENOMIC_ENV !== 'static' &&
      new webpack.HotModuleReplacementPlugin(),
      process.env.NODE_ENV === 'production' &&
      new webpack.optimize.UglifyJsPlugin()
    ].filter(item => item),

    resolve: {
      // react-native(-web) | react-primitives
      extensions: ['.web.js', '.js', '.json'],
      alias: {
        'react-native': 'react-native-web',

        // to ensure a single module is used
        react: path.resolve(path.join(nodeModules, 'react')),
        'react-dom': path.resolve(path.join(nodeModules, 'react-dom')),
        'react-router': path.resolve(path.join(nodeModules, 'react-router'))
      }
    },

    // eslint-disable-next-line max-len
    // https://github.com/facebookincubator/create-react-app/blob/fbdff9d722d6ce669a090138022c4d3536ae95bb/packages/react-scripts/config/webpack.config.prod.js#L279-L285
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  };
};
