export const css = {
  client: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ],
  ssr: [{ test: /\.css$/i, loader: 'null-loader' }],
};
