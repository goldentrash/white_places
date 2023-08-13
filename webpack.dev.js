const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve('node_modules')],
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },

  optimization: {
    minimize: false,

    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  devServer: {
    contentBase: path.resolve('dist', 'publish'),
    watchContentBase: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: ['node_modules', 'lambda'],
      poll: 1000,
    },
  },
});
