import { NextFunction, Response, Request } from 'express';
import { HttpStatus } from 'server/http-statuses';

type ValidationRule<T> = {
  key: keyof T;
  validate: (value: unknown) => boolean;
  required: boolean;
};

export function validatorMiddleware<T>(
  rules: ValidationRule<T>[],
  type: 'body' | 'query' | 'params' = 'body',
) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      let source = request[type];
      for (const { key, validate, required } of rules) {
        if (required && source[key] === undefined) {
          throw new Error(`field [${key}] is required`);
        }
        if (required && !validate(source[key])) {
          throw new Error(`field [${key}] is not valid`);
        }
        if (!required && source[key] !== undefined && !validate(source[key])) {
          throw new Error(`field [${key}] is not valid`);
        }
      }
      next();
    } catch (e: unknown) {
      if (e instanceof Error) {
        response.status(HttpStatus.BadRequest).send({ error: e.message });
      }
    }
  };
}
