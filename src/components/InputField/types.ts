import { ValidatorItem } from '../../utilites/validator';

export type InputFieldProps = {
  type: 'number' | 'text' | 'email' | 'hidden' | 'password';
  label?: string;
  flex?: boolean;
  placeholder?: string;
  validators?: Array<ValidatorItem>;
  disabled?: boolean;
  onChange: (value: string) => void;
};
