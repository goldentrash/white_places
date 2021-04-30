const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
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

  plugins: [new CleanWebpackPlugin()],

  optimization: {
    minimize: true,

    removeAvailableModules: true,
    removeEmptyChunks: true,
    splitChunks: {
      hidePathInfo: true,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },

    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
