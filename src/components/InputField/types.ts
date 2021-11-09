// import { ValidatorItem } from '../../utilites/validator';

export type InputFieldProps = {
  value: string;
  type: 'number' | 'text' | 'email' | 'hidden' | 'password';
  label?: string;
  flex?: boolean;
  placeholder?: string;
  isValid?: boolean;
  errorText: string | null;
  disabled?: boolean;
  onChange: (value: string) => void;
};
