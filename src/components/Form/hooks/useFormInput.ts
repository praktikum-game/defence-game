import { useCallback, useMemo, useState } from 'react';
import { ValidationResult } from '../../../utilities/validators';
import { CompositeValidateFunction } from '../../../utilities/validators/types';
import { FormInputObject, FormInputHookResult } from './types';

export const useFormInput = (
  validator: CompositeValidateFunction,
  initialObject: FormInputObject = {
    value: '',
    validationResult: {
      message: null,
      valid: false,
    },
  },
): FormInputHookResult => {
  const [value, setValue] = useState(initialObject.value);
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    message: initialObject.validationResult.message,
    valid: initialObject.validationResult.valid,
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

  const resultObject: FormInputObject = useMemo(
    () => ({
      value,
      validationResult,
    }),
    [value, validationResult],
  );

  return [resultObject, changeValue];
};
