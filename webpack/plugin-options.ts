export const imageMinOptions = {
  minimizerOptions: {
    plugins: [
      ['gifsicle', { interlaced: true }],
      ['jpegtran', { progressive: true }],
      ['optipng', { optimizationLevel: 5 }],
      [
        'svgo',
        {
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        },
      ],
    ],
  },
};
