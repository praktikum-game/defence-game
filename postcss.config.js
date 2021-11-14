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
          'primary-background': '#6BC732;',
          'default-background': '#FF8A00',
          'secondary-background': '#ffffff',
          'disabled-background': 'rgb(128, 128, 128)',
          'page-background-dark': '#004643',
          'page-background-light': '#01ad79',
          'text-color': '#004643',
          'primary-color': '#6BC732',
          'secondary-color': '#004643',
          'error-text-color': '#ff2f2f',
          'input-label-color': '#999999',
          'input-label-color-dark': '#004643',
          'input-text-color': '#999999',
          'input-border-color': '#0198A4',
        },
      },
    ],
    ['postcss-nested', { preserveEmpty: true }],
  ],
};
