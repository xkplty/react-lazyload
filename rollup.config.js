const typescript = require('rollup-plugin-typescript')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

module.exports = {
  input: './src/index.tsx',
  output: {
    format: 'cjs',
    sourcemap: true
  },
  external: [ 'react', 'react-dom' ],
  plugins: [
    typescript(),
    resolve(),
    commonjs()
  ]
}