import { crudService } from 'server/services/CrudService';
import { Request, Response } from 'express';

export class CrudAPI {
  public static getAll = async (request: Request, response: Response) => {
    const data = await crudService.readAll();
    response.send(data);
  };

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const record = await crudService.readById(Number(id));
    response.send(record);
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    await crudService.create(body);
    response.sendStatus(201);
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const id = params.id;
    await crudService.update(Number(id), body.field, body.value);
    response.sendStatus(204);
  };

  public static delete = async (request: Request, response: Response) => {
    const id = request.params.id;
    await crudService.delete(Number(id));
    response.sendStatus(204);
  };
}
