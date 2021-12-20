import { BaseCrud } from './BaseCrud';
import { CommentAttributes, CommentCreationAttributes, Comment } from '../db/models/Comment';

class CommentCrud extends BaseCrud<CommentAttributes, CommentCreationAttributes> {
  constructor() {
    super(Comment);
  }
}

export const commentCrud = new CommentCrud();
