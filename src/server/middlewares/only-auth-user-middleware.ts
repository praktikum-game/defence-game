import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../http-statuses';

export const onlyAuthUserMiddleware =
  () => async (_0: Request, response: Response, next: NextFunction) => {
    if (response.locals.user === undefined) {
      return response.sendStatus(HttpStatus.Forbidden);
    }
    next();
  };
