const { uglify } = require("rollup-plugin-uglify")

const baseConfig = require('./rollup.config');

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    file: './lib/react-lazyload.min.js',
  },
  plugins: [
    ...baseConfig.plugins,
    uglify()
  ]
}
