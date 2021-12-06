import { RequestHandler } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware'; //An express-style development middleware for use with webpack bundles and allows for serving of the files emitted from webpack. This should be used for development only.
import hotMiddleware from 'webpack-hot-middleware';

//@ts-ignore
import { clientConfig } from 'webpack/config/client.config';

import render from './render';

function getWebpackMiddlewares(config: webpack.Configuration, index: number): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });
  const publicPath = config.output!.publicPath! as string;
  return [
    devMiddleware(compiler, {
      // logLevel:"error" этого видимо нет в новой версии
      publicPath: publicPath,
    }),
    hotMiddleware(compiler, { path: `/__webpack_hmr_${index}` }),
  ];
}

export default [
  ...clientConfig.reduce(
    (middlewares: any, config: any, index: number) => [
      ...middlewares,
      ...getWebpackMiddlewares(config, index),
    ],
    [],
  ),
  render,
];
