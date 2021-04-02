import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

export default (
  _env: Record<string, unknown>,
  argv: Record<string, unknown>
): Configuration => {
  const isProduction: boolean = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'node',
    externals: [nodeExternals()],

    entry: path.resolve('functions', 'graphql.ts'),
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
          include: path.resolve('functions'),
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
