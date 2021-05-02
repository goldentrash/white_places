const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'web',

  entry: path.resolve('src', 'index.tsx'),
  output: {
    filename: 'application.js',
    path: path.resolve('dist', 'publish'),
    pathinfo: false,
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin({ extensions: ['.js', '.ts', '.tsx'] })],
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve('src'), path.resolve('codegen')],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'White Places',
      template: path.resolve('public', 'index.html'),
      favicon: path.resolve('public', 'favicon.png'),
      showErrors: true,
      publicPath: '/',
    }),
  ],
};
