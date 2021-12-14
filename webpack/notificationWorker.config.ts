/* eslint-disable import/no-extraneous-dependencies */

import { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { join } from 'path';
import { DIST_DIR, IS_DEV, SRC_DIR } from './env';
import { ts } from './loaders';

export const notificationWorkerConfig: Configuration = {
  entry: join(SRC_DIR, 'notificationWorker.ts'),
  mode: IS_DEV ? 'development' : 'production',
  devtool: 'source-map',
  output: {
    path: DIST_DIR,
    filename: 'notificationWorker.js',
    publicPath: '/',
  },
  module: {
    rules: [ts.client],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  performance: {
    hints: IS_DEV ? false : 'error',
  },
};
