import { Request, Response, NextFunction } from 'express';
import { getUserDataSsr } from 'server/utilities/getUserData';
import { HttpStatus } from '../http-statuses';

export const authMiddleware =
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { status } = await getUserDataSsr(request.headers.cookie);
      if (status === HttpStatus.OK) {
        next();
      }
    } catch (e: unknown) {
      return response.sendStatus(HttpStatus.Forbidden).send('Not authorize');
    }
  };
