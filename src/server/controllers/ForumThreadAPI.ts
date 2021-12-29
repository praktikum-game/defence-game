import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { forumThreadService } from '../db/services';

export class ForumThreadAPI {
  public static getAll = async (request: Request, response: Response) => {
    const { offset, limit } = request.query;
    const data = await forumThreadService.readAll({ offset: Number(offset), limit: Number(limit) });
    response.json(data);
  };

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const record = await forumThreadService.readById(Number(id));
    response.status(HttpStatus.OK).json(record);
  };

  public static create = async (request: Request, response: Response) => {
    await forumThreadService.create(request.body);
    response.sendStatus(HttpStatus.Created);
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
