export type ValidationResult = {
  valid: boolean;
  message: string | null;
};

export type ValidateItemParams = {
  value: string;
  message: string | null;
};

export type InnerValidationFunction = (params: ValidateItemParams) => ValidationResult;
export type ValidateFunction = (param?: number | RegExp) => InnerValidationFunction;

export type ValidatorItem = {
  checkFunction: InnerValidationFunction;
  message: string;
};

export type CompositeValidateFunction = (value: string, equal?: string) => ValidationResult;
