import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { getUserDataSsr } from 'server/utilities/getUserData';
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
      const { data } = await getUserDataSsr(request.headers.cookie);
      const user = await userService.readById(data.id);
      if (user === null) {
        await userService.create({
          id: Number(data.id),
          name: data.login,
          avatar: data.avatar,
        });
      }
      await forumThreadService.create({ ...request.body, userId: data.id });
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
