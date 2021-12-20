import { BaseCrud } from './BaseCrud';
import {
  ForumThread,
  ForumThreadAttributes,
  ForumThreadCreationAttributes,
} from '../db/models/ForumThread';

class ForumThreadCrud extends BaseCrud<ForumThreadAttributes, ForumThreadCreationAttributes> {
  constructor() {
    super(ForumThread);
  }
}

export const forumThreadCrud = new ForumThreadCrud();
