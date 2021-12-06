import { ENVS } from '../assets/env';

export const typescript = {
  client: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      ENVS.__DEV__ && {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        loader: 'ts-loader',
      },
    ].filter(Boolean) as [],
  },

  ssr: {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
    },
  },
};
