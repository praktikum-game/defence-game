module.exports = {
  plugins: [
    ['postcss-preset-env', {}],
    ['autoprefixer', { grid: true }],
    [
      'postcss-simple-vars',
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
        variables: {
          'primary-background': '#fe9520',
          'default-background': '#808080',
          'secondary-background': 'rgb(163, 54, 241)',
          'disabled-background': 'rgb(128, 128, 128)',
          'page-background-dark': '#004643',
          'page-background-light': '#01ad79',
          'text-color': '#004643',
          'primary-color': '#6BC732',
          'error-text-color': '#ff2f2f',
          'input-label-color': '#999999',
          'input-text-color': '#1e1e1e',
          'input-border-color': '#241f1c',
        },
      },
    ],
    ['postcss-nested', { preserveEmpty: true }],
  ],
};
