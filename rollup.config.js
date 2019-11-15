import typescript from 'rollup-plugin-typescript'

export default {
  input: './src/index.tsx',
  output: {
    file: './lib/react-lazyload.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
}