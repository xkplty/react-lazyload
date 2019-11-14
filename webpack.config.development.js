const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);
config.plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('development'),
  }),
];
config.mode = 'development';

module.exports = config;