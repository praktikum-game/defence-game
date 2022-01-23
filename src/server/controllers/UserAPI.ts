import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';
import { userService } from '../db/services';

export class UserAPI {
  public static getAll = async (_0: Request, response: Response) => {
    const data = await userService.readAll();
    response.json(data);
  };

  public static getByPraktikumId = async (request: Request, response: Response) => {
    const { id } = request.params;
    try {
      const record = await userService.findByPraktikumId(Number(id));
      response.json(record);
    } catch {
      return response.sendStatus(400);
    }
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    try {
      await userService.create(body);
      response.sendStatus(201);
    } catch {
      return response.sendStatus(400);
    }
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const { praktikumId } = params;

    if (Number(praktikumId) !== Number(response.locals.user.id)) {
      return response.sendStatus(HttpStatus.Forbidden);
    }

    if (!body.field || !body.value) {
      return response.sendStatus(HttpStatus.BadRequest);
    }

    try {
      await userService.update({ id: Number(praktikumId) }, { [body.field]: body.value });
      response.sendStatus(204);
    } catch {
      return response.sendStatus(400);
    }
  };

  public static delete = async (request: Request, response: Response) => {
    const { praktikumId } = request.params;
    try {
      await userService.delete({ id: Number(praktikumId) });
      response.sendStatus(204);
    } catch {
      return response.sendStatus(400);
    }
  };
}
