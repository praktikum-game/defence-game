import { Request, Response } from 'express';
import { userService } from '../db/services';

export class UserAPI {
  public static getAll = async (_0: Request, response: Response) => {
    const data = await userService.readAll();
    response.json(data);
  };

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) {
      return response.send(400);
    }
    const record = await userService.readById(Number(id));
    response.json(record);
  };

  public static getByPraktikumId = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) {
      return response.send(400);
    }
    const record = await userService.findByPraktikumId(Number(id));
    response.json(record);
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    await userService.create(body);
    response.sendStatus(201);
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const { praktikumId } = params;
    if (!praktikumId || !body.field || !body.value) {
      return response.sendStatus(400);
    }
    await userService.update({ praktikumId: Number(praktikumId) }, { [body.field]: body.value });
    response.sendStatus(204);
  };

  public static delete = async (request: Request, response: Response) => {
    const { praktikumId } = request.params;
    if (!praktikumId) {
      return response.sendStatus(400);
    }

    await userService.delete({ praktikumId: Number(praktikumId) });
    response.sendStatus(204);
  };
}
