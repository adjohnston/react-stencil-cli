import { resolve } from 'path'

export default {
  entry: resolve(__dirname, 'src/cli.js'),

  output: {
    filename: 'cli.js',
    path: resolve(__dirname, 'dist'),
    library: 'react-stencil',
    libraryTarget: 'umd'
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
    resolve: 'resolve',
    chalk: 'chalk',
    globby: 'globby',
    inquirer: 'inquirer',
    ramda: 'ramda',
    'fs-extra': 'fs-extra',
    'single-line-log': 'single-line-log',
    'react-docgen': 'react-docgen'
  }
}
