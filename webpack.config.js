const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: {
    'desktop': './src/ts/desktop.ts',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [{test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/}],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ],
};