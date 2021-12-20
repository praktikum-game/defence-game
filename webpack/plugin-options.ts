//eslint-disable-next-line
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

export const pluginOptions = {
  imageMinimizerOptions: {
    minimizer: {
      implementation: ImageMinimizerPlugin.imageminMinify,
      options: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 6 }],
          ['svgo'],
        ],
      },
    },
  },
};
