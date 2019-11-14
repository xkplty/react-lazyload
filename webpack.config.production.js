const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const config = Object.create(baseConfig);
config.plugins = [
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify('production'),
  })
];

config.mode = 'production';

module.exports = config;