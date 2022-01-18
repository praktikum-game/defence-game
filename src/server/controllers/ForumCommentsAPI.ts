import { UserData } from 'api/auth';
import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { commentService, userService } from '../db/services';

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
      const userData: UserData = response.locals.user;
      const user = await userService.readById(userData.id);
      if (user === null) {
        await userService.create({
          id: Number(userData.id),
          name: userData.login,
          avatar: userData.avatar,
        });
      }
      const { body } = request;
      const created = await commentService.create({
        ...body,
        ForumThreadId: body.forumThreadId,
        userId: userData.id,
      });
      response.json(created);
    } catch (e: unknown) {
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
