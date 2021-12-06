import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ENVS } from '../assets/env';

const postcssLoader = {
  loader: 'postcss-loader',
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: ENVS.__DEV__,
    // importLoaders: 1,
    // modules: {
    //   localIdentName: ENVS.__DEV__ ? '[name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
    // },
  },
};

const cssLoaders = [MiniCssExtractPlugin.loader, cssLoader, postcssLoader];

export const css = {
  client: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssLoaders,
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }, postcssLoader],
    },
  ],
  ssr: [{ test: /\.css$/i, loader: 'null-loader' }],
};
