import React from "react"
import { ValidationResult } from '../../utilities/validators';

export function inputValueUpdaterFactory(
  validator: (value: string) => ValidationResult,
  validationSetter: React.Dispatch<React.SetStateAction<ValidationResult>>,
  valueSetter: React.Dispatch<React.SetStateAction<string>>,
) {
  return (value: string) => {
    const validationResult = validator(value);
    validationSetter(validationResult);
    valueSetter(value);
  };
}
