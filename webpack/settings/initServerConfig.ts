import { config as envConfig } from 'dotenv'; //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
import merge from 'lodash.merge';
import { join, resolve } from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals'; //Webpack allows you to define externals - modules that should not be bundled.

import { WEBPACK_ROOT_DIR } from '../assets/dir';
import { ENVS, GLOBAL_ARGS } from '../assets/env';

envConfig();

const { DADATA_TOKEN } = process.env;
const { __DEV__ } = ENVS;
console.log(`mode DEV?: ${__DEV__}`);

type InputProps = {
  entry: any;
  lang: string;
};

export const initServerConfig =
  ({ entry, lang }: InputProps) =>
  (webpackConfig: Configuration) => {
    Object.assign(webpackConfig, {
      name: `ssr_bundles_${lang}`,
      target: 'node',
      devtool: 'source-map',
      entry: entry.app,
      node: { __dirname: false },
      mode: __DEV__ ? 'development' : 'production',
      externals: [
        webpackNodeExternals({
          allowlist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
        }),
      ],

      resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        plugins: [new TsconfigPathsPlugin()],
      },

      output: {
        filename: `ssr.bundles.${lang}.js`,
        libraryTarget: 'commonjs2',
        path: join(WEBPACK_ROOT_DIR, 'dist'),
        publicPath: '/static/', // ENVS.__DEV__ ? '/static/' : '', //`https://storage.yandexcloud.net/path/to/S3/${process.env.APP_VERSION}/client/`,
      },

      module: { rules: [] },

      stats: {
        all: undefined,
        builtAt: !__DEV__,
        chunks: !__DEV__,
        assets: !__DEV__,
        errors: true,
        warnings: true,
        outputPath: true,
        timings: true,
      },
      performance: {
        hints: false,
      },

      plugins: [
        new webpack.DefinePlugin(
          merge(GLOBAL_ARGS, {
            'process.env': {
              DADATA_TOKEN: JSON.stringify(DADATA_TOKEN),
              LANG: JSON.stringify(lang),
              APP_SIDE: 'server',
            },
          }),
        ),
        new webpack.ProvidePlugin({
          window: resolve(join(__dirname, '../mock/window.mock')),
          localStorage: resolve(join(__dirname, '../mock/localStorage.mock')),
          document: 'global/document',
        }),
      ],
    });

    return webpackConfig;
  };
