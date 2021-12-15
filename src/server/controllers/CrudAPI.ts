import { crudService } from 'server/services/CrudService';
import { Request, Response } from 'express';

export class CrudAPI {
  public static readAll = async (request: Request, response: Response) => {
    const data = await crudService.readAll();
    response.sendStatus(200).send(data);
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    await crudService.create(body);
    response.sendStatus(201);
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const id = params.id;
    await crudService.update(Number(id), body, 'sdfsdff');
    response.sendStatus(204);
  };

  public static delete = async (request: Request, response: Response) => {
    const id = request.params.id;
    crudService.delete(Number(id));
    response.sendStatus(204);
  };
}
