import { UserData } from 'api/auth';
import { Request, Response, NextFunction } from 'express';
import { userService } from 'server/db/services';

export const checkUserInDbMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (response.locals.user) {
        const userData: UserData = response.locals.user;
        const user = await userService.readById(userData.id);
        if (user === null) {
          await userService.create({
            id: Number(userData.id),
            name: userData.login,
            avatar: userData.avatar,
            SiteThemeId: 1
          });
        }
      }
    } finally {
      next();
    }
  };
