const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],

  entry: path.resolve('lambda', 'index.ts'),
  output: {
    filename: 'graphql.js',
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

  plugins: [new Dotenv()],

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
