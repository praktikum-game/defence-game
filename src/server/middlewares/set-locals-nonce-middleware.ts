import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export const setLocalsNonceMiddleware = async (
  _0: Request,
  response: Response,
  next: NextFunction,
) => {
  response.locals.nonce = crypto.randomBytes(16).toString('hex');
  next();
};
