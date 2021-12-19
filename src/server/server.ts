import { join, resolve } from 'path';
import express, { Express } from 'express';
import compression from 'compression';

import { ssrHtmlRenderMiddleware } from './ssr-html-render-middleware';
import { sequelizeOptions } from './orm';
import { Sequelize } from 'sequelize';
import { router } from './router';
import { initModels } from './orm/initModels';

const sequelize = new Sequelize(sequelizeOptions);

sequelize
  .authenticate()
  .then(() => {
    console.log('\x1b[32m', 'db test connection ok');
    console.log('\x1b[0m');
  })
  .then(() => initModels(sequelize))
  .catch(() => {
    throw new Error('No connection to db');
  });

const app: Express = express();
if (process.env.NODE_ENV === 'development') {
  app.use(compression());
}

app
  .use(express.static(resolve(__dirname, '../dist')))
  .use(express.static(resolve(__dirname, '../static')))
  .use(router);

app.get('/serviceWorker.js', (_0, res) => {
  res.sendFile(join(__dirname, '..', 'dist', 'serviceWorker.js'));
});

app.get('*', ssrHtmlRenderMiddleware());

export { app };
