import { ForumThreadCreationModel } from 'api/forum-topics/types';

export type UpsertMessageModalProps = {
  visible: boolean;
  onClose: () => void;
  onSaveData: () => void;
  data: ForumThreadCreationModel;
  onChange: (field: keyof ForumThreadCreationModel, value: string) => void;
};
