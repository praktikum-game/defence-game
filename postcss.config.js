module.exports = {
  plugins: [
    ['postcss-preset-env', {}],
    ['autoprefixer', { grid: true }],
    // [
    //   'postcss-simple-vars',
    //   {
    //     variables: function () {
    //       const hoho = require('./src/shared/style/vars');
    //       console.log('--------------------vars', hoho);
    //       return hoho;
    //     },
    //   },
    // ],
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
          // c2: 'tomato',
          // 'primary-background': '#6BC732;',
          // 'default-background': '#FF8A00',
          // 'secondary-background': '#ffffff',
          // 'info-btn-border-color': '#ffffff',
          // 'disabled-background': '#DEDEDE',
          // 'page-background-dark': '#004643',
          // 'page-background-light': '#01AD79',
          // 'main-page-header-bg': '#009A9D',
          // 'text-color': '#004643',
          // 'text-color-contrast': '#ffffff',
          // 'primary-color': '#6BC732',
          // 'secondary-color': '#004643',
          // 'error-text-color': '#ff2f2f',
          // 'input-label-color': '#999999',
          // 'input-label-color-dark': '#004643',
          // 'input-text-color': '#999999',
          // 'input-border-color': '#0198A4',
          // 'error-page-accent-color': '#fff501',
          // 'forum-thread-item-background-color': '#f5f5f5',
        },
      },
    ],
    ['postcss-nested', { preserveEmpty: true }],
  ],
};
