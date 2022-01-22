export type TextAreaProps = {
  name: string;
  label: string;
  onSelect: (position: TextAreaCursorPosition) => void;
  onChange: (fieldName: string, value: string) => void;
  value?: string;
  className?: string;
};

export type TextAreaCursorPosition = {
  selectionStart: number;
  selectionEnd: number;
};
