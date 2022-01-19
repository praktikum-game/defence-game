module.exports = {
  plugins: [
    ['postcss-preset-env', {}],
    ['autoprefixer', { grid: true }],
    ['postcss-simple-vars', {}],
    [
      'autoprefixer',
      {
        grid: true,
      },
    ],
    ['postcss-advanced-variables', {}],
    ['postcss-nested', { preserveEmpty: true }],
  ],
};
