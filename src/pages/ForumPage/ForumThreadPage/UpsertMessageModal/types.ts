export type UpsertMessageModalProps = {
  visible: boolean;
  onClose: () => void;
  onSaveData: () => void;
  data: string;
  onChange: (value: string) => void;
};
