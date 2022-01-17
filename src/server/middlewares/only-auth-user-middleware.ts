import { Request, Response, NextFunction } from 'express';
import { getUserDataSsr } from 'server/utilities/getUserData';
import { HttpStatus } from '../http-statuses';

export const onlyAuthUserMiddleware =
  () => async (request: Request, response: Response, next: NextFunction) => {
    if (response.locals.user === undefined) {
      return response.sendStatus(HttpStatus.Forbidden).send('Not authorize');
    }
    next();
  };
