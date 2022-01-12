import express, { Router } from 'express';
import { ForumCommentsAPI } from 'server/controllers/ForumCommentsAPI';
import { CommentAttributes } from 'server/db/models/Comment';
import { validatorMiddleware } from 'server/middlewares/validator-middleware';

const jsonParser = express.json();

export const commentRoutes = (router: Router) => {
  router.get(
    `/comments`,
    validatorMiddleware<{ offset: number; limit: number; forumId: number }>(
      [
        { key: 'offset', validate: (value) => !isNaN(Number(value)), required: true },
        { key: 'limit', validate: (value) => !isNaN(Number(value)), required: true },
        { key: 'forumId', validate: (value) => !isNaN(Number(value)), required: true },
      ],
      'query',
    ),
    ForumCommentsAPI.get,
  );

  router.post(
    `/comments`,
    [
      jsonParser,
      validatorMiddleware<CommentAttributes>([
        { key: 'content', validate: (value) => typeof value === 'string', required: true },
        { key: 'forumThreadId', validate: (value) => !isNaN(Number(value)), required: true },
        { key: 'userId', validate: (value) => !isNaN(Number(value)), required: true },
        { key: 'replyCommentId', validate: (value) => !isNaN(Number(value)), required: false },
      ]),
    ],
    ForumCommentsAPI.create,
  );
  router.patch(
    '/comments/:id',
    [
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
    validatorMiddleware<CommentAttributes>(
      [{ key: 'id', validate: (value) => !isNaN(Number(value)), required: true }],
      'params',
    ),
    ForumCommentsAPI.delete,
  );
};
