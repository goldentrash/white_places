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
  entry: path.resolve('src', 'api', 'graphql.ts'),
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: 'graphql.js',
    path: path.resolve('dist', 'functions'),
    library: {
      type: 'commonjs',
    },
  },
  resolve: {
    extensions: ['.ts'],
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
  entry: path.resolve('src', 'public', 'app.ts'),
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src', 'public', '*.png'),
          to: path.resolve('dist', 'static', '[name].[ext]'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'public', 'index.html'),
      showErrors: false,
      publicPath: '/',
    }),
  ],
  output: {
    filename: 'application.js',
    path: path.resolve('dist', 'static'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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

export default [apiConfig /*, clientConfig */];
