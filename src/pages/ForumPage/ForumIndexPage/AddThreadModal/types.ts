import { ForumThreadCreationModel } from 'api/forum-topics/types';

export type AddThreadModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreateTopic?: (data: ForumThreadCreationModel) => void;
};
