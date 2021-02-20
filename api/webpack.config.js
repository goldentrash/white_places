import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src', 'graphql.ts'),
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
        exclude: [path.resolve(__dirname, 'node_modules')],
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
