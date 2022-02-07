import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../http-statuses';

export const checkRequestCookiesMiddleware =
  () => (request: Request, response: Response, next: NextFunction) => {
    if (request.headers.cookie === undefined) {
      return response.sendStatus(HttpStatus.Unauthorized);
    }
    next();
  };
