const baseConfig = require('./rollup.config');

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    file: './lib/react-lazyload.js'
  },
}