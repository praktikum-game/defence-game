import { ForumThreadModel } from 'api/forum-topics';

export type ThreadListItemProps = {
  className?: string;
  dataItem: ForumThreadModel;
  isAuthor: boolean;
  onRemoveClick: (id: number) => void;
  onEditClick: (id: number) => void;
};
