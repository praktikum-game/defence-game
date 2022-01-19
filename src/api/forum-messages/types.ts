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
  forum_thread: {
    subject: string;
    content: string;
    createdAt: string;
    userId: number;
    id: number;
  };
};

export type NewMessageModelResponse = {
  ForumThreadId: number;
  content: string;
  createdAt: string;
  forumThreadId: number;
  id: number;
  replyCommentId: null | number;
  updatedAt: string;
  userId: number;
};
