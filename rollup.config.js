import typescript from 'rollup-plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: './src/index.tsx',
  output: {
    file: './lib/react-lazyload.js',
    format: 'cjs',
    sourcemap: true
  },
  external: [ 'react', 'react-dom' ],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    uglify()
  ]
}