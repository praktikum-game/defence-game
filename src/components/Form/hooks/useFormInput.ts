import { useCallback, useMemo, useState } from 'react';
import { ValidationResult } from '../../../utilities/validators';
import { CompositeValidateFunction } from '../../../utilities/validators/types';
import { FormInputHookObject } from './types';

export const useFormInput = (
  validator: CompositeValidateFunction,
  initialObject: FormInputHookObject = {
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

  const changeValidationResult = useCallback(
    (val: string, equal?: string) => {
      const result = validator(val, equal);
      setValidationResult(result);
    },
    [validator],
  );

  const changeValue = useCallback(
    (val: string, equal?: string) => {
      setValue(val);
      changeValidationResult(val, equal);
    },
    [changeValidationResult],
  );

  const resultObject: FormInputHookObject = useMemo(
    () => ({
      value,
      errorMessage: validationResult.message,
      isValid: validationResult.valid,
    }),
    [value, validationResult],
  );

  return { resultObject, changeValue };
};
