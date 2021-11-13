import { ValidateFunction, ValidationResult, ValidatorItem, ValidateItemParams } from './types';

const valid = (): ValidationResult => ({ valid: true, message: null });
const invalid = (message: string | null): ValidationResult => ({ valid: false, message });

export const required: ValidateFunction =
  () =>
  ({ value, message }) => {
    if (!value || value.toString().trim().length < 1) {
      return invalid(message);
    }
    return valid();
  };

export const longerThan: ValidateFunction =
  (criteria) =>
  ({ value, message }) => {
    if (criteria) {
      return value && value.toString().trim().length > criteria ? valid() : invalid(message);
    }
    return valid();
  };

export const shorterThan: ValidateFunction =
  (criteria) =>
  ({ value, message }) => {
    if (criteria) {
      return value && value.toString().trim().length < criteria ? valid() : invalid(message);
    }
    return valid();
  };

export const email: ValidateFunction =
  () =>
  ({ value, message }) => {
    const re = /^\S+@\S+\.\S{1,4}$/;
    return re.test(value) ? valid() : invalid(message);
  };

export const onlyAlphabeticOrDigits: ValidateFunction =
  () =>
  ({ value, message }) => {
    const re = /^[A-Za-z0-9]*$/;
    return re.test(value) ? valid() : invalid(message);
  };

export const atLeastOneDigit: ValidateFunction =
  () =>
  ({ value, message }) => {
    const re = /^(?=\D*\d).*$/;
    return re.test(value) ? valid() : invalid(message);
  };

export const atLeastOneUpperCaseLetter: ValidateFunction =
  () =>
  ({ value, message }) => {
    const re = /^(?=.*[A-Z]).*$/;
    return re.test(value) ? valid() : invalid(message);
  };

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

export function loginValidator(value: string): ValidationResult {
  const validators: ValidatorItem[] = [
    {
      checkFunction: (params: ValidateItemParams) => required()({ ...params }),
      message: 'Логин не может быть пустым',
    },
    {
      checkFunction: (params: ValidateItemParams) => longerThan(2)({ ...params }),
      message: 'Логин должен быть больше 2 символов',
    },
    {
      checkFunction: (params: ValidateItemParams) => onlyAlphabeticOrDigits()({ ...params }),
      message: 'Логин может состоять только из латиницы и/или цифр',
    },
  ];
  return validate(validators, value);
}

export function passwordValidator(value: string): ValidationResult {
  const validators: ValidatorItem[] = [
    {
      checkFunction: (params: ValidateItemParams) => required()({ ...params }),
      message: 'Пароль не может быть пустым',
    },
    {
      checkFunction: (params: ValidateItemParams) => longerThan(7)({ ...params }),
      message: 'Пароль должен быть больше 7 символов',
    },
    {
      checkFunction: (params: ValidateItemParams) => atLeastOneDigit()({ ...params }),
      message: 'Пароль должен содержать, как минимум, одну цифру',
    },
    {
      checkFunction: (params: ValidateItemParams) => atLeastOneUpperCaseLetter()({ ...params }),
      message: 'Пароль должен содержать, как минимум, одну заглавную букву английского алфавита',
    },
  ];
  return validate(validators, value);
}
