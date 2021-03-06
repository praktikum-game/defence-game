import { CommentAttributes, CommentCreationAttributes, Comment } from '../models/Comment';
import { BaseService } from './BaseService';

class CommentService extends BaseService<CommentAttributes, CommentCreationAttributes, Comment> {
  constructor() {
    super(Comment);
  }
}

export const commentService = new CommentService();
