const path = require('path');

module.exports = {
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    alias: {
      'node-forge': path.resolve(__dirname, 'src/forge.min.js'),
    },
  },
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
