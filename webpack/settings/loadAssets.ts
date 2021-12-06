import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

export const loadAssets =
  ({ isCopyStatic = true } = {}) =>
  (webpackConfig: Configuration) => {
    // webpackConfig.module.rules.push(csv, file.ssr, svg.ssr, url);

    if (isCopyStatic) {
      webpackConfig?.plugins?.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: './www/favicons', to: 'favicons' },
            { from: './www/robots.txt', to: '' },
          ],
        }),
      );
    }

    return webpackConfig;
  };
