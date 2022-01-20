import express, { Router } from 'express';
import { ForumCommentsAPI } from 'server/controllers/ForumCommentsAPI';
import { CommentAttributes } from 'server/db/models/Comment';
import { checkUserInDbMiddleware } from 'server/middlewares/check-user-in-db-middleware';
import { onlyAuthUserMiddleware } from 'server/middlewares/only-auth-user-middleware';
import { validatorMiddleware } from 'server/middlewares/validator-middleware';

const jsonParser = express.json();

export const commentRoutes = (router: Router) => {
  router.get(
    `/comments`,
    validatorMiddleware<{ offset: number; limit: number; forumId: number }>(
      [{ key: 'forumId', validate: (value) => !isNaN(Number(value)), required: true }],
      'query',
    ),
    ForumCommentsAPI.get,
  );

  router.post(
    `/comments`,
    [
      onlyAuthUserMiddleware,
      checkUserInDbMiddleware,
      jsonParser,
      validatorMiddleware<CommentAttributes>([
        { key: 'content', validate: (value) => typeof value === 'string', required: true },
        { key: 'forumThreadId', validate: (value) => !isNaN(Number(value)), required: true },
        { key: 'replyCommentId', validate: (value) => !isNaN(Number(value)), required: false },
      ]),
    ],
    ForumCommentsAPI.create,
  );
  router.patch(
    '/comments/:id',
    [
      onlyAuthUserMiddleware,
      checkUserInDbMiddleware,
      jsonParser,
      validatorMiddleware<CommentAttributes>(
        [
          { key: 'content', validate: (value) => typeof value === 'string', required: false },
          { key: 'forumThreadId', validate: (value) => !isNaN(Number(value)), required: false },
          { key: 'userId', validate: (value) => !isNaN(Number(value)), required: false },
          { key: 'replyCommentId', validate: (value) => !isNaN(Number(value)), required: false },
        ],
        'body',
      ),
      validatorMiddleware<CommentAttributes>(
        [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
        'params',
      ),
    ],
    ForumCommentsAPI.update,
  );
  router.delete(
    '/comments/:id',
    onlyAuthUserMiddleware,
    checkUserInDbMiddleware,
    validatorMiddleware<CommentAttributes>(
      [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
      'params',
    ),
    ForumCommentsAPI.delete,
  );
};
