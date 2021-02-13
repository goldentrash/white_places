const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const baseConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
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
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

const apiConfig = {
  ...baseConfig,
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'api', 'handler.ts'),
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'graphql.js',
    path: path.resolve(__dirname, 'functions'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          path.resolve(__dirname, 'elm-stuff'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: 'ts-loader',
      },
    ],
  },
};

const clientConfig = {
  ...baseConfig,
  target: 'web',
  entry: path.resolve(__dirname, 'client', 'public', 'application.js'),
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'client', 'public', '*.css'),
          to: path.resolve(__dirname, 'dist', '[name].[ext]'),
        },
        {
          from: path.resolve(__dirname, 'client', 'public', '*.png'),
          to: path.resolve(__dirname, 'dist', '[name].[ext]'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'public', 'index.html'),
      showErrors: false,
      inject: 'body',
    }),
  ],
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [
          path.resolve(__dirname, 'elm-stuff'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: 'elm-webpack-loader',
      },
    ],
    noParse: [/\.elm$/],
  },
};

module.exports = [apiConfig, clientConfig];
