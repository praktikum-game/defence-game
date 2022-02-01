/* eslint-disable import/no-extraneous-dependencies */

import { Configuration, IgnorePlugin, ProgressPlugin, DefinePlugin } from 'webpack';
import { join } from 'path';
import { DIST_DIR, IS_DEV, SSR_DIR } from './env';
import { css, ts, image } from './loaders';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { pluginOptions } from './plugin-options';
import { config } from 'dotenv';

config();

export const serverConfig: Configuration = {
  name: 'ssr',
  target: 'node',
  mode: IS_DEV ? 'development' : 'production',
  entry: join(SSR_DIR, 'server.ts'),
  module: {
    rules: [css.ssr, ts.ssr, image.ssr],
  },
  output: {
    filename: 'ssr.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  optimization: {
    minimizer: [new ImageMinimizerPlugin(pluginOptions.imageMinimizerOptions)],
  },
  plugins: [
    new ProgressPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/game/assets/images/', to: './assets/images/' },
        { from: './certs/', to: './certs/' },
      ],
    }),
    new DefinePlugin({
      OAUTH_REDIRECT_URL: JSON.stringify(process.env.OAUTH_REDIRECT_URL),
      OAUTH_CLIENT_ID: JSON.stringify(process.env.OAUTH_CLIENT_ID),
    }),
    // это исключение очень важно - без него не соберется
    new IgnorePlugin({
      resourceRegExp: /^pg-native$/,
    }),
  ],
  devtool: 'source-map',
  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};
