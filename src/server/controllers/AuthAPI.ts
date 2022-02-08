/* eslint-disable @typescript-eslint/naming-convention */
import { praktikumAuthApi } from 'api/auth/AuthAPI';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { HttpStatus } from 'server/http-statuses';

export class AuthAPI {
  public static signin = async (request: Request, response: Response) => {
    try {
      const { login, password } = request.body;
      const { headers } = await praktikumAuthApi.login({ login, password });
      response.setHeader('set-cookie', headers['set-cookie']!);
      response.sendStatus(HttpStatus.OK);
    } catch (e: unknown) {
      const { response: er } = e as AxiosError;
      if (er !== undefined) {
        response.sendStatus(er.status);
      } else {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };

  public static signup = async (request: Request, response: Response) => {
    try {
      const { login, password, first_name, second_name, email, phone } = request.body;
      const { data } = await praktikumAuthApi.register({
        login,
        password,
        first_name,
        second_name,
        email,
        phone,
      });
      response.status(HttpStatus.Created).json(data);
    } catch (e: unknown) {
      const { response: er } = e as AxiosError;
      if (er !== undefined) {
        response.sendStatus(er.status);
      } else {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };

  public static signout = async (request: Request, response: Response) => {
    try {
      const { headers } = await praktikumAuthApi.logout({
        headers: { cookie: request.headers.cookie! },
      });

      response.setHeader('set-cookie', headers['set-cookie']!);
      response.sendStatus(200);
    } catch (e: unknown) {
      const { response: er } = e as AxiosError;
      if (er !== undefined) {
        response.sendStatus(er.status);
      } else {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };

  public static getUser = async (request: Request, response: Response) => {
    const { cookie } = request.headers;
    try {
      if (cookie === undefined) {
        response.status(HttpStatus.Unauthorized);
      } else {
        const { data } = await praktikumAuthApi.userRead({
          headers: {
            Cookie: cookie,
          },
        });

        response.status(HttpStatus.OK).json(data);
      }
    } catch (e: unknown) {
      const { response: er } = e as AxiosError;
      if (er !== undefined) {
        response.sendStatus(er.status);
      } else {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };
}
