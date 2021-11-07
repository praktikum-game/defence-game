export type ValidationResult = {
  valid: boolean;
  message: string | null;
};

type ValidateItemParams = {
  value: string;
  message: string | null;
};

export type InnerValidationFunction = (params: ValidateItemParams) => ValidationResult;
export type ValidateFunction = (criteria?: number) => InnerValidationFunction;

export type ValidatorItem = {
  checkFunction: InnerValidationFunction;
  message: string;
};

const valid = (): ValidationResult => ({ valid: true, message: null });
const invalid = (message: string | null): ValidationResult => ({ valid: false, message });

class InputValidators {
  static require: ValidateFunction = () => ({ value, message }) => {
    if (!value || value.toString().trim().length < 1) {
      return invalid(message);
    }
    return valid();
  };

  static longerThan: ValidateFunction = (criteria) => ({ value, message }) => {
    if (criteria) {
      return value && value.toString().trim().length > criteria ? valid() : invalid(message);
    }
    return valid();
  };

  static shorterThan: ValidateFunction = (criteria) => ({ value, message }) => {
    if (criteria) {
      return value && value.toString().trim().length < criteria ? valid() : invalid(message);
    }
    return valid();
  };

  static email:ValidateFunction = () => ({ value, message }) => {
    const re = /^\S+@\S+\.\S{1,4}$/;
    return re.test(value) ? valid() : invalid(message);
  };
}

export const validate = (validators: Array<ValidatorItem>, value: string): ValidationResult => {
  if (validators && validators.length > 0) {
    for (const { checkFunction, message } of validators) {
      const checkResult: ValidationResult = checkFunction({ value, message });
      if (!checkResult.valid) {
        return checkResult;
      }
    }
  }
  return { valid: true, message: null };
};

export default InputValidators;
