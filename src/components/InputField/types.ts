import { InputHTMLAttributes } from 'react';

export type InputFieldOwnProps = {
  label?: string;
  flex?: boolean;
  isValid?: boolean;
  errorText: string | null;
  disabled?: boolean;
  valueChangeCallback?: (value: string, lastValue?: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export type InputFieldProps = InputFieldOwnProps;
