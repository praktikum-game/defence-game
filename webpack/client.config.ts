/* eslint-disable import/no-extraneous-dependencies */

import { Configuration, DllReferencePlugin, DefinePlugin } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import { join, resolve } from 'path';
import { DIST_DIR, IS_DEV, SRC_DIR, SSR_DIR } from './env';
import { ts, css, image } from './loaders';
import { pluginOptions } from './plugin-options';
import { InjectManifest } from 'workbox-webpack-plugin';
import { config } from 'dotenv';

config();

console.log(process.env);
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
    rules: [ts.client, css.client, image.client],
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
    new ImageMinimizerPlugin(pluginOptions.imageMinimizerOptions),
    new DefinePlugin({
      OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
    }),

    !IS_DEV &&
      // Должен быть всегда последним плагином
      new InjectManifest({
        swSrc: resolve(__dirname, '..', 'src', 'serviceWorker.ts'),
        mode: 'production',
      }),
  ].filter(Boolean) as [],
  performance: {
    hints: IS_DEV ? false : 'error',
  },
};
