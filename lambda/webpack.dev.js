const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],

  entry: {
    graphql: path.resolve('lambda', 'graphql', 'index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist', 'lambda'),
    pathinfo: false,
    library: {
      type: 'commonjs',
    },
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin({ extensions: ['.js', '.ts'] })],
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve('node_modules')],
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.ts$/,
        include: [path.resolve('lambda'), path.resolve('codegen')],
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
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
};
