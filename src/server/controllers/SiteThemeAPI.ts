import { Request, Response } from 'express';
import { siteThemeService } from '../db/services';

export class SiteThemeAPI {
  public static getAll = async (_0: Request, response: Response) => {
    const data = await siteThemeService.readAll();
    response.json(data);
  };

  public static getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    if (!id) {
      return response.sendStatus(400);
    }
    const record = await siteThemeService.readById(Number(id));
    response.json(record);
  };

  public static getByThemeName = async (request: Request, response: Response) => {
    const { theme } = request.params;
    const record = await siteThemeService.findByThemeName(theme);
    response.json(record);
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    await siteThemeService.create(body);
    response.sendStatus(201);
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const { theme } = params;
    if (!theme || !body.field || !body.value) {
      return response.sendStatus(400);
    }
    await siteThemeService.update({ theme }, { [body.field]: body.value });
    response.sendStatus(204);
  };

  public static delete = async (request: Request, response: Response) => {
    const { theme } = request.params;
    if (!theme) {
      return response.sendStatus(400);
    }

    await siteThemeService.delete({ theme });
    response.sendStatus(204);
  };
}
