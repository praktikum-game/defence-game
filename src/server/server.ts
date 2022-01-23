/* eslint-disable no-console */
import { join, resolve } from 'path';
import express, { Express } from 'express';
import compression from 'compression';
// import helmet from 'helmet';
import xXssProtection from 'x-xss-protection';
import https from 'https';
import cookieParserMiddleware from 'cookie-parser';

import { ssrHtmlRenderMiddleware } from './middlewares/ssr-html-render-middleware';
import { sequelize } from './db/sequelize';
import { router } from './router';
import { readFileSync } from 'fs';
import { addTestSamples } from './db/testSample';
import { getUserMiddleware } from './middlewares/get-user-middleware';
import { initCommentModel, Comment } from './db/models/Comment/Comment';
import { initForumThreadModel, ForumThread } from './db/models/ForumThread/ForumThread';
import { initUserModel, User } from './db/models/User/User';
import { initSiteThemeModel, SiteTheme } from './db/models/SiteTheme/SiteTheme';

initCommentModel(sequelize);
initForumThreadModel(sequelize);
initUserModel(sequelize);
initSiteThemeModel(sequelize);

SiteTheme.hasMany(User, { as: 'users' });
User.belongsTo(SiteTheme, { as: 'siteTheme' });

User.hasMany(ForumThread, { as: 'forumThreads' });
User.hasMany(Comment, { as: 'comments' });

ForumThread.belongsTo(User, { as: 'user' });
ForumThread.hasMany(Comment, { as: 'comments' });

Comment.belongsTo(User, { as: 'user' });
Comment.belongsTo(ForumThread, { as: 'forumThread' });

Comment.belongsTo(Comment, { as: 'replyComment' });

sequelize
  .authenticate()
  .then(() => {
    console.log('\x1b[32m', 'db test connection ok');
    console.log('\x1b[0m');
    sequelize
      .sync({ force: true })
      .then(() => {
        console.log('Sequelize is synced');
        if (process.env.NODE_ENV !== 'production') {
          addTestSamples().then(() => {
            console.log('Test samples added');
          });
        }
      })
      .catch((e) => console.log(e));
  })
  .catch((e) => {
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
      console.log('\x1b[32m', `START HTTPS DEV SERVER ON PORT:${PORT}`);
      console.log('\x1b[0m');
    });
  } else {
    // Если сервер в прод, то перед ним будет стоять nginx
    app.listen(PORT, () => {
      console.log('\x1b[32m', `START PRODUCTION SERVER ON PORT: ${PORT}`);
      console.log('\x1b[0m');
    });
  }
};

if (process.env.NODE_ENV === 'development') {
  app.use(compression());
}

app
  // Добавляем CSP + вагон разных предустановленных защит. Установленные настройки следующие:
  // https://helmetjs.github.io/ -> helmet.contentSecurityPolicy(options)

  /**  БЛОКИРУЕТ ИНЛАЙНОВЫЙ СТРО ПРИ SSR */
  // .use(
  //   helmet({
  //     contentSecurityPolicy: {
  //       useDefaults: false,
  //       directives: {
  //         defaultSrc: ["'self'", 'ya-praktikum.tech', 'fonts.googleapis.com', 'fonts.gstatic.com'],
  //         scriptSrc: ["'self'", 'ya-praktikum.tech', 'fonts.googleapis.com'],
  //       },
  //     },
  //   }),
  // )
  // Отключаем заголовок X-XSS-Protection, так как он вызывает много проблем и используем для защиты другие способы
  .use(xXssProtection())
  .use(express.static(resolve(__dirname)))
  .use(getUserMiddleware)
  .use('/api/v1', router);

app.get('/serviceWorker.js', (_0, res) => {
  res.sendFile(join(__dirname, 'serviceWorker.js'));
});

const cookieParser = cookieParserMiddleware();
const ssrRender = ssrHtmlRenderMiddleware();

app.get('*', [cookieParser, ssrRender]);

export { startServer };
