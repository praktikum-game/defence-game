import { useCallback, useMemo, useState } from 'react';
import { CompositeValidateFunction } from '../../utilities/validators/types';
import { FormInputHookResult, FormOutputObject } from './types';

export const useFormInput = (
  validator: CompositeValidateFunction,
  initValue: string = '',
  errorMessages: Array<string> = [],
): FormInputHookResult => {
  const [value, setValue] = useState(initValue);
  const [validationMessages, setValidationMessages] = useState<Array<string>>(errorMessages);

  const changeValidationResult = useCallback(
    (val: string, equal?: string) => {
      const result = validator(val, equal);
      setValidationMessages(result);
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

  const result: FormOutputObject = useMemo(
    () => ({
      value,
      messages: validationMessages,
    }),
    [value, validationMessages],
  );

  return [result, changeValue];
};
