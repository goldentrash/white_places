import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const commonConfig: Configuration = {
  resolve: {
    plugins: [new TsconfigPathsPlugin({ extensions: ['.js', '.ts', '.tsx'] })],
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve('src'), path.resolve('functions')],
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
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
  watchOptions: {
    ignored: 'node_modules',
  },
};

const apiConfig: Configuration = {
  ...commonConfig,
  target: 'node',
  entry: path.resolve('functions', 'graphql.ts'),
  output: {
    filename: 'graphql.js',
    path: path.resolve('dist', 'functions'),
    library: {
      type: 'commonjs',
    },
  },
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
};

const clientConfig: Configuration = {
  ...commonConfig,
  target: 'web',
  entry: path.resolve('src', 'index.tsx'),
  output: {
    filename: 'application.js',
    path: path.resolve('dist', 'publish'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      showErrors: false,
      publicPath: '/',
      favicon: path.resolve('public', 'favicon.png'),
    }),
  ],
};

export default [clientConfig, apiConfig];
