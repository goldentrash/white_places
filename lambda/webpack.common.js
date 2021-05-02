const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
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
};
