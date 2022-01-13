import {
  ForumThread,
  ForumThreadAttributes,
  ForumThreadCreationAttributes,
} from '../models/ForumThread';
import { literal } from 'sequelize';
import { BaseService } from './BaseService';

class ForumThreadService extends BaseService<ForumThreadAttributes, ForumThreadCreationAttributes> {
  constructor() {
    super(ForumThread);
  }

  public getForumThreads(offset: number = 0, limit: number = 10) {
    /**
     *  Укажите, если знаете, как сделать более оптимально
     */
    return ForumThread.findAll({
      offset: Number(offset),
      limit: Number(limit),
      include: 'user',

      attributes: {
        include: [
          // Не знаю, как сделать подзапрос с несколькими полями
          // [
          //   literal(`(
          //     SELECT avatar
          //     FROM users 
          //     WHERE 
          //       users.id= "${ForumThread.name}".user_id
          //   )`),
          //   'userAvatar',
          // ],
          // [
          //   literal(`(
          //     SELECT name
          //     FROM users 
          //     WHERE 
          //       users.id= "${ForumThread.name}".user_id
          //   )`),
          //   'userName',
          // ],
          [
            literal(`(
                SELECT COUNT(*)
                FROM comments AS comments
                WHERE
                  comments.forum_thread_id = "${ForumThread.name}".id
              )`),
            'messagesCount',
          ],
        ],
      },
    });
  }
}

export const forumThreadService = new ForumThreadService();
