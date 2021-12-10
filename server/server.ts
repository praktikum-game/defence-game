import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import express, { Express } from 'express';
import compression from 'compression';
import { ssrHtmlRenderMiddleware } from './ssr-html-render-middleware';
import https from 'https';

const { PORT = 3001, NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const app: Express = express();

const startServer = () => {
  if (isDev) {
    app.use(compression());

    const options = {
      cert: readFileSync(join(__dirname, '..', 'certs', 'cert.crt'), 'utf-8'),
      key: readFileSync(join(__dirname, '..', 'certs', 'cert.key'), 'utf-8'),
    };

    https.createServer(options, app).listen(PORT, '0.0.0.0' as any, () => {
      console.log('\x1b[32m', `START HTTPS DEV SERVER ON PORT:${PORT}`);
      console.log('\x1b[0m');
    });
  }

  if (!isDev) {
    app.listen(PORT, () => {
      console.log('\x1b[32m', `START PRODUCTION SERVER ON PORT: ${PORT}`);
      console.log('\x1b[0m');
    });
  }
};

app
  .use(express.static(resolve(__dirname, '../dist')))
  .use(express.static(resolve(__dirname, '../static')));

app.get('/serviceWorker.js', (_0, res) => {
  res.sendFile(join(__dirname, '..', 'dist', 'serviceWorker.js'));
});

app.get('/*', ssrHtmlRenderMiddleware);

export { startServer };
