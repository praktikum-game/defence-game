const settings = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
};

export const image = {
  client: { ...settings },
  ssr: { ...settings },
};
