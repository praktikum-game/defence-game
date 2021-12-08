const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/;

export const file = {
  client: {
    loader: 'url-loader',
    test: fileRegex,
  },
  server: {
    loader: 'null-loader',
    test: fileRegex,
  },
};
