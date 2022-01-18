import { Request, Response, NextFunction } from 'express';
import { getUserDataSsr } from 'server/utilities/getUserData';
import { HttpStatus } from '../http-statuses';

export const getUserMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.locals.user = undefined;
  try {
    const { data, status } = await getUserDataSsr(request.headers.cookie);
    if (status === HttpStatus.OK) {
      response.locals.user = data;
    }
  } catch (e: unknown) {}
  next();
};
