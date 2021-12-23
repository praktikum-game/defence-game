import { Request, Response } from 'express';
import { siteThemeService } from '../db/services';

export class SiteThemeAPI {
  public static getAll = async (_0: Request, response: Response) => {
    const data = await siteThemeService.readAll();
    response.json(data);
  };

  public static getByThemeName = async (request: Request, response: Response) => {
    const { theme } = request.params;
    const record = await siteThemeService.findByThemeName(theme);
    response.json(record);
  };

  public static create = async (request: Request, response: Response) => {
    const { body } = request;
    if (typeof body.theme === 'string') {
      await siteThemeService.create(body);
      return response.sendStatus(201);
    }
    response.sendStatus(400);
  };

  public static update = async (request: Request, response: Response) => {
    const { body, params } = request;
    const { theme } = params;
    if (!body.theme) {
      return response.sendStatus(400);
    }
    await siteThemeService.update({ theme }, { theme: body.theme });
    response.sendStatus(204);
  };

  public static delete = async (request: Request, response: Response) => {
    const { theme } = request.params;
    await siteThemeService.delete({ theme });
    response.sendStatus(204);
  };
}
