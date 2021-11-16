import React from 'react';
import { ValidationResult } from '../../utilities/validators';

export function inputValueUpdaterFactory(
  validator: (value: string, lastValue?: string) => ValidationResult,
  validationSetter: React.Dispatch<React.SetStateAction<ValidationResult>>,
  valueSetter: React.Dispatch<React.SetStateAction<string>>,
) {
  return function updateValue(value: string, lastValue?: string) {
    const validationResult = validator(value, lastValue);
    validationSetter(validationResult);
    valueSetter(value);
  };
}
