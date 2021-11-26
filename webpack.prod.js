const { merge } = require('webpack-merge');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    // Должен быть всегда последним плагином
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src', 'serviceWorker.ts'),
      mode: 'production',
    }),
  ],
});
