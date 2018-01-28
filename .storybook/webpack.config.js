const path = require('path');

const srcPath = path.resolve(__dirname, '../src');

// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const webpackConfig = require('../webpack.config');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  });
  // scss
  config.module.rules.push(webpackConfig.module.loaders[1]);
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.modules = [srcPath, 'node_modules'];
  return config;
};
