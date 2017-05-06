import { resolve } from 'path'

export default {
  entry: resolve(__dirname, 'src/cli.js'),

  output: {
    filename: 'cli.js',
    path: resolve(__dirname, 'dist')
  },

  target: 'node',

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  externals: {
    path: 'path',
    fs: 'fs',
    log: 'single-line-log',
    chalk: 'chalk',
    glob: 'globby',
    reactDocs: 'react-docgen',
    inquirer: 'inquirer',
    ramda: 'ramda'
  }
}
