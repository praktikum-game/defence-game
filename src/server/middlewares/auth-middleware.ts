import { Request, Response, NextFunction } from 'express';
import { getUserDataSsr } from 'server/utilities/getUserData';
import { HttpStatus } from '../http-statuses';

export const authMiddleware =
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { data, status } = await getUserDataSsr(request.headers.cookie);
      if (status === HttpStatus.OK) {
        response.locals.user = data;

        next();
      }
    } catch (e: unknown) {
      return response.sendStatus(HttpStatus.Forbidden).send('Not authorize');
    }
  };
