import CompressionWebpackPlugin from 'compression-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join } from 'path';
import webpack, { Configuration } from 'webpack';

import { STATS_OPTIONS, VENDORS } from '../assets/config';
import { WEBPACK_ROOT_DIR } from '../assets/dir';
import { ENVS } from '../assets/env';

const DIST_DIR = join(WEBPACK_ROOT_DIR, 'dist');

const vendorConfig: Configuration = {
  target: 'web',
  devtool: 'source-map',
  entry: {
    vendors: VENDORS,
  },
  output: {
    library: '[name]_[hash]',
    filename: '[name]_[hash].js',
    path: join(DIST_DIR, 'client', '_'),
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: join(DIST_DIR, 'webpack', 'vendors-manifest.json'),
    }),
    new MiniCssExtractPlugin({ filename: '[name]_[hash].css' }),
    !ENVS.__DEV__ && new CompressionWebpackPlugin({ minRatio: 1 }),
  ].filter(Boolean) as [],
  stats: STATS_OPTIONS,
};

// если экстортить сразу, то выскакивает ошибка конфигурации
export default vendorConfig;
