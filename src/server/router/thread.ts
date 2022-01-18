import express, { Router } from 'express';
import { ForumThreadAPI } from 'server/controllers/ForumThreadAPI';
import { ForumThreadAttributes } from 'server/db/models/ForumThread';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';
import { validatorMiddleware } from 'server/middlewares/validator-middleware';

const jsonParser = express.json();

export const threadRoutes = (router: Router) => {
  router.get(
    `/threads`,
    validatorMiddleware<{ offset: number; limit: number }>(
      [
        { key: 'offset', validate: (value) => !isNaN(Number(value)), required: true },
        { key: 'limit', validate: (value) => !isNaN(Number(value)), required: true },
      ],
      'query',
    ),
    ForumThreadAPI.getAll,
  );
  router.get(
    `/threads/:id`,
    onlyAuthUserMiddleware,
    validatorMiddleware<ForumThreadAttributes>(
      [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
      'params',
    ),
    ForumThreadAPI.getById,
  );
  router.post(
    `/threads`,
    [
      jsonParser,
      onlyAuthUserMiddleware,
      validatorMiddleware<ForumThreadAttributes>([
        { key: 'subject', validate: (value) => typeof value === 'string', required: true },
        { key: 'content', validate: (value) => typeof value === 'string', required: true },
      ]),
    ],
    ForumThreadAPI.create,
  );
  router.patch(
    '/threads/:id',
    [
      jsonParser,
      onlyAuthUserMiddleware,
      validatorMiddleware<ForumThreadAttributes>(
        [
          { key: 'subject', validate: (value) => typeof value === 'string', required: false },
          { key: 'content', validate: (value) => typeof value === 'string', required: false },
          { key: 'userId', validate: (value) => typeof value === 'number', required: false },
        ],
        'body',
      ),
      validatorMiddleware<ForumThreadAttributes>(
        [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
        'params',
      ),
    ],
    ForumThreadAPI.update,
  );
  router.delete(
    '/threads/:id',
    onlyAuthUserMiddleware,
    validatorMiddleware<ForumThreadAttributes>(
      [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
      'params',
    ),
    ForumThreadAPI.delete,
  );
};
