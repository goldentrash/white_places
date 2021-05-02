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

  watchOptions: {
    ignored: ['node_modules', 'src'],
    poll: 1000,
  },
});
