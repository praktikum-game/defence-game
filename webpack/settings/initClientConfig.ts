import CompressionWebpackPlugin from 'compression-webpack-plugin'; // repare compressed versions of assets to serve them with Content-Encoding.
//@ts-ignore
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'; //Webpack plugin that warns when your bundle contains multiple versions of the same package.
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin'; //Webpack plugin that runs TypeScript type checker on a separate process.
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'; //Create smaller Lodash builds by replacing feature sets of modules with noop, identity, or simpler alternatives.
import { join } from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'; //Use this to load modules whose location is specified in the paths section of tsconfig.json when using webpack.
import {
  DllReferencePlugin,
  ProgressPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin,
  Configuration,
} from 'webpack';

// работа с dir мне не совсем понятна, потому что на разных стадиях сборки выдаются разные пути
import { CLIENT_DIR, DIST_DIR, ROOT_DIR } from '../assets/dir';
import { ENVS, GLOBAL_ARGS } from '../assets/env';
import { InitClientConfigProps } from './types';

const { __DEV__, __PROD__ } = ENVS;

const vendorsManifest = require(join(DIST_DIR, 'webpack', 'vendors-manifest.json').replace(
  'dist/dist',
  'dist',
));

export const initClientConfig =
  ({ lang, index }: InitClientConfigProps) =>
  (webpackConfig: Configuration) => {
    // Т.к. все сборки отличаются только переводами, то проверять типы можно только один раз
    const shouldCheckTypes = index === 0;

    webpackConfig = Object.assign(webpackConfig, {
      name: `client_${lang}`,
      target: 'web',
      devtool: 'source-map',
      entry: {
        desktop: [
          __DEV__ && 'css-hot-loader/hotModuleReplacement',
          __DEV__ && `webpack-hot-middleware/client?path=/__webpack_hmr_${index}`,
          join(CLIENT_DIR, 'bundles', 'desktop').replace('dist/', ''),
        ].filter(Boolean) as string[],
      },
      mode: __DEV__ ? 'development' : 'production',
      output: {
        filename: `[name].bundle.${lang}.js`,
        library: 'Client',
        libraryTarget: 'var',
        path: join(DIST_DIR, 'client'),
        publicPath: __DEV__
          ? '/static/'
          : `https://storage.yandexcloud.net/path/to/S3/${process.env.APP_VERSION}/client/`,
      },
      resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json'],
        plugins: [new TsconfigPathsPlugin()],
      },
      module: {
        // может это вынести в лоадер ?
        rules: [
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },
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
        new DllReferencePlugin({
          context: ROOT_DIR,
          manifest: vendorsManifest,
        }),
        new ProgressPlugin(),
        new DefinePlugin(GLOBAL_ARGS), //почему бы нам сюда не пробросить process.env
        new LodashModuleReplacementPlugin({
          shorthands: true,
          cloning: true,
          currying: true,
          collections: true,
          coercions: true,
          flattening: true,
          paths: true,
        }),
        // не знаю надо ли это нам
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
      ],
    });

    if (shouldCheckTypes) {
      webpackConfig.plugins?.push(new ForkTsCheckerPlugin());
    }

    if (__DEV__) {
      webpackConfig.plugins?.push(
        new HotModuleReplacementPlugin(),
        new CompressionWebpackPlugin({ minRatio: 1 }),
      );
    }

    if (__PROD__) {
      webpackConfig.plugins?.push(new DuplicatePackageCheckerPlugin());
    }

    return webpackConfig;
  };
