import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

export const setCspPolicyMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // Добавляем CSP + вагон разных предустановленных защит. Установленные настройки следующие:
  // https://helmetjs.github.io/ -> helmet.contentSecurityPolicy(options)

  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'", 'ya-praktikum.tech', 'fonts.googleapis.com', 'fonts.gstatic.com'],
        scriptSrc: [
          "'self'",
          `'nonce-${response.locals.nonce}'`,
          'ya-praktikum.tech',
          'fonts.googleapis.com',
        ],
      },
    },
    noSniff: false,
  })(request, response, next);
};
