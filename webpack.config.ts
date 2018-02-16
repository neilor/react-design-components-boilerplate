import * as path from 'path';
import * as webpack from 'webpack';

import CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
import HtmlWebpackPlugin = require('html-webpack-plugin');

const outPath = path.join(__dirname, './dist');
const sourcePath = path.join(__dirname, './src');

const config: webpack.Configuration = {
  context: sourcePath,
  entry: {
    main: './index.tsx'
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: ['node_modules', '.']
  },
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          'react-hot-loader/webpack',
          'istanbul-instrumenter-loader',
          'awesome-typescript-loader'
        ]
      },
      // s?css
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]__[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: 'minimal'
  },
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};

module.exports = config;
