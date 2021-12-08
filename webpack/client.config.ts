import { Configuration, DllReferencePlugin } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { join } from 'path';
import { DIST_DIR, IS_DEV, SRC_DIR, SSR_DIR } from './env';
import { ts, css } from './loaders';

export const clientConfig: Configuration = {
  entry: join(SRC_DIR, 'index.tsx'),
  mode: IS_DEV ? 'development' : 'production',
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    filename: '[name]_[fullhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      ts.client,
      css.client,
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new DllReferencePlugin({
      context: join(DIST_DIR, '..'),
      manifest: join(DIST_DIR, 'vendors', 'vendors-manifest.json'),
    }),
    new MiniCssExtractPlugin({ filename: '[name]_[fullhash].css' }),
    new AssetsPlugin({ path: SSR_DIR, filename: 'assets.json' }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
  performance: {
    hints: IS_DEV ? false : 'error',
  },
};
