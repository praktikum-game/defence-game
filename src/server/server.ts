/* eslint-disable no-console */
import { join, resolve } from 'path';
import express, { Express } from 'express';
import compression from 'compression';
import xXssProtection from 'x-xss-protection';
import https from 'https';
import cookieParserMiddleware from 'cookie-parser';

import { ssrHtmlRenderMiddleware } from './middlewares/ssr-html-render-middleware';
import { sequelize } from './db/sequelize';
import { router } from './router';
import { readFileSync } from 'fs';
import { addTestSamples, initThemes } from './db/testSample';
import { getUserMiddleware } from './middlewares/get-user-middleware';
import { initCommentModel, Comment } from './db/models/Comment/Comment';
import { initForumThreadModel, ForumThread } from './db/models/ForumThread/ForumThread';
import { initUserModel, User } from './db/models/User/User';
import { initSiteThemeModel, SiteTheme } from './db/models/SiteTheme/SiteTheme';
import { setLocalsNonceMiddleware } from './middlewares/set-locals-nonce-middleware';
import { setCspPolicyMiddleware } from './middlewares/set-csp-policy-middleware';

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
      .sync()
      .then(() => {
        console.log('Sequelize is synced');
        if (process.env.NODE_ENV !== 'production') {
          addTestSamples().then(() => {
            console.info('Test samples added');
          });
        } else {
          initThemes().then(() => console.info('Themes added'));
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
    // ???????? ???????????? ?? ????????, ???? ?????????? ?????? ?????????? ???????????? nginx
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
  .use(express.static(resolve(__dirname)))
  .use(setLocalsNonceMiddleware)
  .use(setCspPolicyMiddleware)
  // ?????????????????? ?????????????????? X-XSS-Protection, ?????? ?????? ???? ???????????????? ?????????? ?????????????? ?? ???????????????????? ?????? ???????????? ???????????? ??????????????
  .use(xXssProtection())
  .use(getUserMiddleware)
  .use('/api/v1', router);

app.get('/serviceWorker.js', (_0, res) => {
  res.sendFile(join(__dirname, 'serviceWorker.js'));
});

const cookieParser = cookieParserMiddleware();
const ssrRender = ssrHtmlRenderMiddleware();

app.get('*', [cookieParser, ssrRender]);

export { startServer };
