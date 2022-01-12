import express, { Router } from 'express';
import { ForumThreadAPI } from 'server/controllers/ForumThreadAPI';
import { ForumThreadAttributes } from 'server/db/models/ForumThread';
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

    validatorMiddleware<ForumThreadAttributes>(
      [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
      'query',
    ),
    ForumThreadAPI.getById,
  );
  router.post(
    `/threads`,
    [
      jsonParser,
      validatorMiddleware<ForumThreadAttributes>([
        { key: 'subject', validate: (value) => typeof value === 'string', required: true },
        { key: 'content', validate: (value) => typeof value === 'string', required: true },
        { key: 'userId', validate: (value) => typeof value === 'number', required: true },
      ]),
    ],
    ForumThreadAPI.create,
  );
  router.patch(
    '/threads/:id',
    [
      jsonParser,
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
    validatorMiddleware<ForumThreadAttributes>(
      [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
      'params',
    ),
    ForumThreadAPI.delete,
  );
};
