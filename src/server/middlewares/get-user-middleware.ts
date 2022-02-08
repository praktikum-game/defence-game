import { praktikumAuthApi } from 'api/auth';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../http-statuses';

export const getUserMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.locals.user = undefined;
  try {
    const { data, status } = await praktikumAuthApi.userRead({
      headers: { cookie: request.headers.cookie! },
    });
    if (status === HttpStatus.OK) {
      response.locals.user = data;
    }
  } catch (e: unknown) {}
  next();
};
