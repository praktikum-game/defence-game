export type MessageModel = {
  content: string;
  createdAt: string;
  id: number;
  replyCommentId: number;
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
