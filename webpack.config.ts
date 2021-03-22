import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const apiConfig: Configuration = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve('src', 'functions', 'graphql.ts'),
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'graphql.js',
    path: path.resolve('dist', 'functions'),
    library: {
      type: 'commonjs',
    },
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: path.resolve('node_modules'),
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};

const clientConfig: Configuration = {
  mode: 'production',
  target: 'web',
  entry: path.resolve('src', 'index.tsx'),
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('public', '*.png'),
          to: path.resolve('dist', 'static', '[name].[ext]'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
      showErrors: false,
      publicPath: '/',
    }),
  ],
  output: {
    filename: 'application.js',
    path: path.resolve('dist', 'static'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: path.resolve('node_modules'),
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
};

export default [apiConfig, clientConfig];
