import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { commentService } from '../db/services';

export class ForumCommentsAPI {
  public static getComments = async (request: Request, response: Response) => {
    try {
      const { offset, limit, forumId } = request.query;
      const comments = await commentService.readAll({
        where: { forum: forumId },
        limit: Number(limit),
        offset: Number(offset),
      });

      response.status(HttpStatus.OK).json(comments);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static createComment = async (request: Request, response: Response) => {
    try {
      const { body } = request;
      await commentService.create(body);
      response.sendStatus(HttpStatus.Created);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static editComment = async (request: Request, response: Response) => {
    try {
      const { body, params } = request;
      const { id } = params;
      await commentService.update({ id: Number(id) }, body);
      response.sendStatus(HttpStatus.NoContent);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };
}
