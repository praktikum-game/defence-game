import { UserData } from 'api/auth';
import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { commentService } from '../db/services';

export class ForumCommentsAPI {
  public static get = async (request: Request, response: Response) => {
    try {
      const { forumId } = request.query;
      const comments = await commentService.readAll({
        where: { forumThreadId: forumId },
        include: { all: true },
        order: [['createdAt', 'ASC']],
      });
      response.status(HttpStatus.OK).json(comments);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static create = async (request: Request, response: Response) => {
    try {
      const userData: UserData = response.locals.user;
      const { body } = request;
      const created = await commentService.create({
        ...body,
        ForumThreadId: body.forumThreadId,
        userId: userData.id,
      });
      response.json(created);
    } catch (e: unknown) {
      // eslint-disable-next-line no-console
      console.log(e);
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
