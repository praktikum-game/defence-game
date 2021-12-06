import MiniCssExtractPlugin from 'mini-css-extract-plugin'; //This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
import { Configuration } from 'webpack';

import { css } from '../loaders';

interface Options {
  isSSR: boolean;
}

export const loadStyles = (_options: Options) => (webpackConfig: Configuration) => {
  webpackConfig.plugins?.push(
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  );

  webpackConfig.module?.rules?.push(...css.client);

  return webpackConfig;
};
