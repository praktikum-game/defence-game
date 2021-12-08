export const ts = {
  client: {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /(node_modules)/,
    options: {
      transpileOnly: true,
    },
  },
  ssr: {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /(node_modules)/,
    options: {
      transpileOnly: true,
    },
  },
};
