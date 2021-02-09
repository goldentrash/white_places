const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
};

const apiConfig = {
  ...baseConfig,
  target: 'node',
  entry: path.resolve(__dirname, 'api', 'handler.ts'),
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'graphql.js',
    path: path.resolve(__dirname, 'functions'),
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/elm-stuff$/, /node_modules$/],
        use: 'ts-loader',
      },
    ],
  },
};

const clientConfig = {
  ...baseConfig,
  target: 'web',
  entry: path.resolve(__dirname, 'client', 'src', 'Main.elm'),
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'public', 'index.html'),
      showErrors: true,
      // inject: 'body',
    }),
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
  ],
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff$/, /node_modules$/],
        use: {
          loader: 'elm-webpack-loader',
          options: {},
        },
      },
      {
        test: /\.css$/,
        type: 'asset/resource',
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
    noParse: [/\.elm$/],
  },
};

module.exports = [apiConfig, clientConfig];
