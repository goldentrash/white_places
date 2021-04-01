import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const clientConfig = (
  _env: Record<string, unknown>,
  argv: Record<string, unknown>
): Configuration => {
  const isProduction: boolean = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'web',

    entry: path.resolve('src', 'index.tsx'),
    output: {
      filename: '[name].js',
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
          include: path.resolve('src'),
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
              eslint: { enabled: true, files: './src/**/*.{ts,tsx}' },
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
      port: 8080,
      contentBase: path.resolve('dist', 'publish'),
      watchContentBase: true,
      watchOptions: {
        ignored: ['node_modules', 'functions'],
        poll: 1000,
      },
    },
  };
};

export default clientConfig;
