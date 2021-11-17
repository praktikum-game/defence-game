import { useState } from 'react';
import { ValidationResult } from 'utilities/validators';

export type FormInputObject = {
  value: string;
  errorMessage: string | null;
  isValid: boolean;
};

export type ValidatorFunction = (value: string, equal?: string) => ValidationResult;

export const useFormInput = (
  validator: ValidatorFunction,
  initialObject: FormInputObject = {
    value: '',
    errorMessage: null,
    isValid: false,
  },
) => {
  const [value, setValue] = useState(initialObject.value);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    message: initialObject.errorMessage,
    valid: initialObject.isValid,
  });

  const changeValidationResult = (val: string, equal?: string) => {
    const result = validator(val, equal!);
    setValidationResult(result);
  };

  const changeValue = (val: string, equal?: string) => {
    setValue(val);
    changeValidationResult(val, equal!);
  };

  const resultObject: FormInputObject = {
    value,
    errorMessage: validationResult.message,
    isValid: validationResult.valid,
  };

  return { resultObject, changeValue };
};
