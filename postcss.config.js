module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      },
    ],
    [
      'autoprefixer',
      {
        grid: true,
      },
    ],
    [
      'postcss-advanced-variables',
      {
        variables: {},
      },
    ],
  ],
};
