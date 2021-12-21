import { Request, Response } from 'express';
import { userService } from '../db/services';

export class UserAPI {
  public static getAll = async (request: Request, response: Response) => {
    const data = await userService.readAll();
    response.send(data);
  };

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const record = await userService.readById(Number(id));
    response.send(record);
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    await userService.create(body);
    response.sendStatus(201);
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const id = params.id;
    await userService.update(Number(id), body.field, body.value);
    response.sendStatus(204);
  };

  public static delete = async (request: Request, response: Response) => {
    const id = request.params.id;
    await userService.delete(Number(id));
    response.sendStatus(204);
  };
}
