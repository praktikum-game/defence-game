/* eslint-disable import/no-extraneous-dependencies */

import { DllPlugin } from 'webpack';
import { join } from 'path';
import { DIST_DIR, IS_DEV } from './env';
import { VENDORS } from './vendors';
import AssetsPlugin from 'assets-webpack-plugin';

export default {
  mode: IS_DEV ? 'development' : 'production',
  target: 'web',
  devtool: 'source-map',
  entry: {
    vendors: VENDORS,
  },
  output: {
    library: '[name]_[fullhash]',
    path: join(DIST_DIR, 'vendors'),
    filename: '[name]_[fullhash].js',
  },
  plugins: [
    new DllPlugin({
      path: join(DIST_DIR, 'vendors', 'vendors-manifest.json'),
      name: '[name]_[fullhash]',
    }),
    new AssetsPlugin({
      path: DIST_DIR,
      removeFullPathAutoPrefix: true,
      filename: 'vendors-assets.json',
    }),
  ],
};
