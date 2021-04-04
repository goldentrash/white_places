const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'web',

    entry: path.resolve('src', 'index.tsx'),
    output: {
      filename: 'application.js',
      path: path.resolve('dist', 'publish'),
      pathinfo: false,
    },

    resolve: {
      plugins: [
        new TsconfigPathsPlugin({ extensions: ['.js', '.ts', '.tsx'] }),
      ],
      extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: [path.resolve('src'), path.resolve('codegen')],
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
      ],
    },

    plugins: [
      ...(isProduction
        ? [
            new CleanWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
              eslint: { enabled: true, files: 'src/**/*.{ts,tsx}' },
            }),
            new ESLintPlugin({
              extensions: ['ts', 'tsx'],
              files: 'src',
              failOnError: true,
              failOnWarning: true,
            }),
          ]
        : []),
      new HtmlWebpackPlugin({
        title: 'White Places',
        template: path.resolve('public', 'index.html'),
        favicon: path.resolve('public', 'favicon.png'),
        meta: {
          charset: 'UTF-8',
          viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
        },
        showErrors: isProduction ? false : true,
        publicPath: '/',
      }),
    ],

    optimization: {
      minimize: isProduction ? true : false,

      removeAvailableModules: isProduction ? true : false,
      removeEmptyChunks: isProduction ? true : false,
      splitChunks: isProduction
        ? {
            hidePathInfo: true,
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
          }
        : false,

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

    devServer: {
      contentBase: path.resolve('dist', 'publish'),
      watchContentBase: true,
      historyApiFallback: true,
      watchOptions: {
        ignored: ['node_modules', 'functions'],
        poll: 1000,
      },
    },
  };
};
