import { ForumThreadCreationModel } from 'api/forum-topics/types';
import { AddThreadModalProps } from '../AddThreadModal';

export type EditThreadModalProps = Pick<AddThreadModalProps, 'visible' | 'onClose'> & {
  onSaveData: () => void;
  data?: ForumThreadCreationModel;
  onChange: (field: keyof ForumThreadCreationModel, value: string) => void;
};
