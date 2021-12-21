import {
  ForumThread,
  ForumThreadAttributes,
  ForumThreadCreationAttributes,
} from '../models/ForumThread';
import { BaseService } from './BaseService';

class ForumThreadService extends BaseService<ForumThreadAttributes, ForumThreadCreationAttributes> {
  constructor() {
    super(ForumThread);
  }
}

export const forumThreadService = new ForumThreadService();
