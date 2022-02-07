import { praktikumOauthApi } from 'api/oauth';
import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';

export class OAuthAPI {
  public static getServiceId = async (request: Request, response: Response) => {
    const { redirectUri } = request.params;
    const resp = await praktikumOauthApi.getServiceId(redirectUri);
    response.status(HttpStatus.OK).json(resp.data);
  };

  public static appOAuth = async (request: Request, response: Response) => {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { code, redirect_uri } = request.body;
      const { headers } = await praktikumOauthApi.oauth({ code, redirect_uri });
      response.setHeader('set-cookie', headers['set-cookie']!);

      response.sendStatus(202);
    } catch (e: unknown) {
      response.sendStatus(HttpStatus.InternalServerError);
    }
  };
}
