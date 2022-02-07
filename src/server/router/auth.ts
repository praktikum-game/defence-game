import { LoginRequest, RegisterRequest } from 'api/auth';
import express, { Router } from 'express';
import { AuthAPI } from 'server/controllers/AuthAPI';
import { checkRequestCookiesMiddleware } from 'server/middlewares/check-request-cookies-middleware';
import { validatorMiddleware } from 'server/middlewares/validator-middleware';

const jsonParser = express.json();
const cookieChecker = checkRequestCookiesMiddleware();

export const authRoutes = (router: Router) => {
  router.post(
    '/auth/signin',
    jsonParser,
    validatorMiddleware<LoginRequest>(
      [
        { key: 'login', validate: (value) => typeof value === 'string', required: true },
        { key: 'password', validate: (value) => typeof value === 'string', required: true },
      ],
      'body',
    ),
    AuthAPI.signin,
  );
  router.post(
    '/auth/signup',
    jsonParser,
    validatorMiddleware<RegisterRequest>(
      [
        { key: 'login', validate: (value) => typeof value === 'string', required: true },
        { key: 'password', validate: (value) => typeof value === 'string', required: true },
        {
          key: 'email',
          validate: (value) => typeof value === 'string' && value.indexOf('@') > -1,
          required: true,
        },
        {
          key: 'first_name',
          validate: (value) => typeof value === 'string' && value.length > 3,
          required: true,
        },
        {
          key: 'second_name',
          validate: (value) => typeof value === 'string' && value.length > 1,
          required: true,
        },
        {
          key: 'phone',
          validate: (value) => !isNaN(Number(value)),
          required: true,
        },
      ],
      'body',
    ),
    AuthAPI.signup,
  );
  router.post('/auth/logout', cookieChecker, AuthAPI.signout);
  router.get('/auth/user', cookieChecker, AuthAPI.getUser);
};
