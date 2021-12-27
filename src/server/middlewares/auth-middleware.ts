import { AxiosError } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { authAPI } from '../../api/auth';
import { HttpStatus } from '../http-statuses';

export const authMiddleware =
  () => async (request: Request, response: Response, next: NextFunction) => {
    const { cookie } = request.headers;
    if (!cookie) {
      return response.sendStatus(HttpStatus.Forbidden).send('User not authorized');
    }
    try {
      const { status } = await authAPI.userRead({
        headers: {
          Cookie: cookie,
        },
      });
      if (status === HttpStatus.OK) {
        next();
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      if (error.code) {
        response.sendStatus(HttpStatus.InternalServerError);
      }
    }
  };
