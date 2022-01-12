import { UserData } from 'api/auth';
import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { forumThreadService, userService } from '../db/services';

export class ForumThreadAPI {
  public static getAll = async (request: Request, response: Response) => {
    try {
      const { offset, limit } = request.query;

      const data = await forumThreadService.getForumThreads(Number(offset), Number(limit));
      response.json(data);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const record = await forumThreadService.readById(Number(id));
    response.status(HttpStatus.OK).json(record);
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
      await forumThreadService.create({ ...request.body, userId: userData.id });
      response.sendStatus(HttpStatus.Created);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const { id } = params;
    await forumThreadService.update({ id: Number(id) }, body);
    response.sendStatus(HttpStatus.NoContent);
  };

  public static delete = async (request: Request, response: Response) => {
    const { id } = request.params;
    const result = await forumThreadService.delete({ id: Number(id) });
    if (result) {
      response.sendStatus(HttpStatus.NoContent);
    } else {
      response.status(HttpStatus.NotFound).send({ error: 'record not found' });
    }
  };
}
