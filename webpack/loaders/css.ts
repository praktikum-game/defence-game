import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const css = {
  client: {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
  },
  ssr: {
    test: /\.css$/,
    loader: 'null-loader',
  },
};
