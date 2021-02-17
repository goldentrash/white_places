const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const apiConfig = {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
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
        exclude: [
          path.resolve(__dirname, 'elm-stuff'),
          path.resolve(__dirname, 'node_modules'),
        ],
        use: 'ts-loader',
      },
    ],
  },
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

const clientConfig = {
  mode: 'production',
  target: 'web',
  entry: path.resolve(__dirname, 'client', 'public', 'app.js'),
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'client', 'public', '*.png'),
          to: path.resolve(__dirname, 'dist', '[name].[ext]'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client', 'public', 'index.html'),
      showErrors: false,
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
    noParse: [/\.elm$/],
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

module.exports = [apiConfig, clientConfig];
