/* eslint-disable import/no-extraneous-dependencies */

import { Configuration, DllReferencePlugin } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { join } from 'path';
import { DIST_DIR, IS_DEV, SRC_DIR } from './env';
import { ts } from './loaders';

export const notificationWorkerConfig: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  entry: {
    notificationWorker: join(SRC_DIR, 'notificationWorker.ts'),
  },
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [ts.client],
  },
  resolve: {
    modules: ['src/notificationWorker.ts'],
    extensions: ['.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new DllReferencePlugin({
      context: join(DIST_DIR, '..'),
      manifest: join(DIST_DIR, 'vendors', 'vendors-manifest.json'),
    }),
  ].filter(Boolean) as [],

  performance: {
    hints: IS_DEV ? false : 'error',
  },
};
