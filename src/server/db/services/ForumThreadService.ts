import {
  ForumThread,
  ForumThreadAttributes,
  ForumThreadCreationAttributes,
} from '../models/ForumThread';
import { literal } from 'sequelize';
import { BaseService } from './BaseService';

class ForumThreadService extends BaseService<ForumThreadAttributes, ForumThreadCreationAttributes, ForumThread> {
  constructor() {
    super(ForumThread);
  }

  public getForumThreads(offset: number = 0, limit: number = 10) {
    return ForumThread.findAll({
      offset: Number(offset),
      limit: Number(limit),
      include: 'user',

      attributes: {
        include: [
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
