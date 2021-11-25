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

export const regExpCheck: ValidateFunction = (pattern?: number | RegExp) => {
  if (typeof pattern === 'number' || typeof pattern === 'undefined') {
    throw new Error('Wrong parameter for regExpCheck');
  }

  return ({ value, message }) => (pattern.test(value) ? valid() : invalid(message));
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
  const loginPattern = /^(?!\d+)[A-Za-z-_0-9]{3,20}$/;

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
      checkFunction: (params: ValidateItemParams) => regExpCheck(loginPattern)({ ...params }),
      message: 'Логин может состоять только из латиницы и/или цифр и не начинаться с цифр',
    },
  ];
  return validate(validators, value);
}

export function passwordValidator(value: string, lastValue?: string): ValidationResult {
  const passwordPattern = /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/;

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
      checkFunction: (params: ValidateItemParams) => regExpCheck(passwordPattern)({ ...params }),
      message:
        'Пароль должен содержать, как минимум, одну цифру и одну заглавную букву английского алфавита',
    },
  ];

  if (lastValue !== undefined && value !== lastValue) {
    return invalid('Пароль должен совпадать с предыдущим');
  }

  return validate(validators, value);
}

export function emailValidator(value: string): ValidationResult {
  const emailPattern = /^[A-Za-z0-9-]+@[A-Za-z0-9]+\.[a-z]+$/;

  const validators: ValidatorItem[] = [
    {
      checkFunction: (params: ValidateItemParams) => required()({ ...params }),
      message: 'Почта не может быть пустой',
    },
    {
      checkFunction: (params: ValidateItemParams) => regExpCheck(emailPattern)({ ...params }),
      message: 'Почта должна соответствовать форме email@example.com',
    },
  ];
  return validate(validators, value);
}

export function phoneValidator(value: string): ValidationResult {
  const phonePattern = /^[+]{0,1}[0-9]{10,15}$/;

  const validators: ValidatorItem[] = [
    {
      checkFunction: (params: ValidateItemParams) => required()({ ...params }),
      message: 'Номер не может быть пустым',
    },
    {
      checkFunction: (params: ValidateItemParams) => regExpCheck(phonePattern)({ ...params }),
      message:
        'Номер может состоять только из цифр. Может начинаться с цифры' +
        ' или +. Должен содержать от 10 до 15 цифр',
    },
  ];
  return validate(validators, value);
}

export function nameValidator(value: string): ValidationResult {
  const namePattern = /^[A-ZА-ЯЁ][A-Za-zА-Яа-яёЁ-]*$/;

  const validators: ValidatorItem[] = [
    {
      checkFunction: (params: ValidateItemParams) => required()({ ...params }),
      message: 'Имя не может быть пустым',
    },
    {
      checkFunction: (params: ValidateItemParams) => regExpCheck(namePattern)({ ...params }),
      message:
        'Имя должно начинаться с заглавной буквы и содержать только кириллицу и/или латиницу',
    },
  ];
  return validate(validators, value);
}
