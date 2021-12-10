const settings = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /(node_modules)/,
  options: {
    transpileOnly: true,
  },
};

export const ts = {
  client: { ...settings },
  ssr: { ...settings },
};
