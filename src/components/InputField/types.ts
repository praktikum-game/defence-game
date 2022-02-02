export type InputFieldOwnProps = {
  name?: string;
  id?: string;
  type?: 'text' | 'number' | 'password' | 'file' | 'email' | 'tel' | 'checkbox';
  label?: string;
  flex?: boolean;
  disabled?: boolean;
  view?: 'default' | 'labeled';
  errors?: Array<string>;
  value?: string | number;
  accept?: string;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  onTextChange?: (value: string, lastValue?: string) => void;
};

export type InputFieldProps = InputFieldOwnProps;
