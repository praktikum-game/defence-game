import { join, resolve } from 'path';
import express, { Express } from 'express';
import compression from 'compression';

import { ssrHtmlRenderMiddleware } from './ssr-html-render-middleware';

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(compression());
}

app
  .use(express.static(resolve(__dirname, '../dist')))
  .use(express.static(resolve(__dirname, '../static')));

app.get('/serviceWorker.js', (_0, res) => {
  res.sendFile(join(__dirname, '..', 'dist', 'serviceWorker.js'));
});

app.get('*', ssrHtmlRenderMiddleware);

export { app };
