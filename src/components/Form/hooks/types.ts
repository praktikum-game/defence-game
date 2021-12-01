import { ValidationResult } from '../../../utilities/validators';

export type FormInputObject = {
  validationResult: ValidationResult;
};

export type FormOutputObject = FormInputObject & { value: string };

export type FormInputHookResult = [
  FormOutputObject,
  (val: string, equal?: string | undefined) => void,
];
