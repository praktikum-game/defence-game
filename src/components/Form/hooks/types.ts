import { ValidationResult } from '../../../utilities/validators';

export type FormInputObject = {
  value: string;
  validationResult: ValidationResult;
};

export type FormInputHookResult = [
  FormInputObject,
  (val: string, equal?: string | undefined) => void,
];
