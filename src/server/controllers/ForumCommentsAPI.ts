import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { commentService } from '../db/services';

export class ForumCommentsAPI {
  public static get = async (request: Request, response: Response) => {
    try {
      const { offset, limit, forumId } = request.query;
      const comments = await commentService.readAll({
        where: { forumThreadId: forumId },
        limit: Number(limit),
        offset: Number(offset),
        include: { all: true },
      });

      response.status(HttpStatus.OK).json(comments);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static create = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      await commentService.create(body);
      response.sendStatus(HttpStatus.Created);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static update = async (request: Request, response: Response) => {
    try {
      const { body, params } = request;
      const { id } = params;

      await commentService.update({ id: Number(id) }, body);
      response.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static delete = async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await commentService.delete({ id: Number(id) });
    if (result) {
      response.sendStatus(HttpStatus.NoContent);
    } else {
      response.status(HttpStatus.NotFound).send({ error: 'record not found' });
    }
  };
}
