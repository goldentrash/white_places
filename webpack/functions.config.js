const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'node',
    externals: [nodeExternals()],

    entry: path.resolve('functions', 'index.ts'),
    output: {
      filename: 'graphql.js',
      path: path.resolve('dist', 'functions'),
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
          include: [path.resolve('functions'), path.resolve('codegen')],
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
              eslint: { enabled: true, files: 'functions/**/*.ts' },
            }),
            new ESLintPlugin({
              extensions: ['ts'],
              files: 'functions',
              failOnError: true,
              failOnWarning: true,
            }),
          ]
        : []),
      new Dotenv(),
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

    watchOptions: {
      ignored: ['node_modules', 'src'],
      poll: 1000,
    },
  };
};
