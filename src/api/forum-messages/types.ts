import { ForumThreadModel } from 'api/forum-topics';
import { CommentAttributes } from 'server/db/models/Comment';
import { TimestampsModelAttributes } from 'shared/types/TimestampsModelAttributes';

export type MessageModel = {
  content: string;
  createdAt: string;
  id: number;
  replyCommentId: number | null;
  user: {
    avatar: string | null;
    name: string;
    id: number;
  };
  forum_thread?: ForumThreadModel;
};

export type NewMessageModelResponse = CommentAttributes & TimestampsModelAttributes;
