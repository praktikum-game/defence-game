import { join, resolve } from 'path';
import express, { Express } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import xXssProtection from 'x-xss-protection';
import { ssrHtmlRenderMiddleware } from './middlewares/ssr-html-render-middleware';
import { sequelize } from './db/sequelize';
import { router } from './router';
import { readFileSync } from 'fs';
import https from 'https';
import cookieParserMiddleware from 'cookie-parser';
import { addTestSamples } from './db/testSample';

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m', 'db test connection ok');
    // eslint-disable-next-line no-console
    console.log('\x1b[0m');
    sequelize
      .sync({ force: true })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Sequelize is synced');
        if (process.env.NODE_ENV !== 'production') {
          addTestSamples().then(() => {
            // eslint-disable-next-line no-console
            console.log('Test samples added');
          });
        }
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e);
    throw new Error('No connection to db');
  });

const app: Express = express();

const startServer = (PORT: number) => {
  if (process.env.NODE_ENV !== 'production') {
    const options = {
      cert: readFileSync(join(__dirname, 'certs', 'cert.crt'), 'utf-8'),
      key: readFileSync(join(__dirname, 'certs', 'cert.key'), 'utf-8'),
    };
    https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
      // eslint-disable-next-line no-console
      console.log('\x1b[32m', `START HTTPS DEV SERVER ON PORT:${PORT}`);
      // eslint-disable-next-line no-console
      console.log('\x1b[0m');
    });
  } else {
    // Если сервер в прод, то перед ним будет стоять nginx
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log('\x1b[32m', `START PRODUCTION SERVER ON PORT: ${PORT}`);
      // eslint-disable-next-line no-console
      console.log('\x1b[0m');
    });
  }
};

if (process.env.NODE_ENV === 'development') {
  app.use(compression());
}

app
  // Добавляем CSP + вагон разных предустановленных защит. Установленные настройки следующие:
  /*
    default-src 'self';
    base-uri 'self';
    block-all-mixed-content;
    font-src 'self' https: data:;
    frame-ancestors 'self';
    img-src 'self' data:;
    object-src 'none';
    script-src 'self';
    script-src-attr 'none';
    style-src 'self' https: 'unsafe-inline';
    upgrade-insecure-requests
  */
  .use(helmet())
  // Отключаем заголовок X-XSS-Protection, так как он вызывает много проблем и используем для защиты другие способы
  .use(xXssProtection())
  .use(express.static(resolve(__dirname)))
  .use('/api/v1', router);

app.get('/serviceWorker.js', (_0, res) => {
  res.sendFile(join(__dirname, 'serviceWorker.js'));
});

const cookieParser = cookieParserMiddleware();
const ssrRender = ssrHtmlRenderMiddleware();

app.get('*', [cookieParser, ssrRender]);

export { startServer };
