export type ValidateItemParams = {
  value: string;
  message: string;
};

export type InnerValidationFunction = (params: ValidateItemParams) => string | null;
export type ValidateFunction<T = undefined> = (param?: T) => InnerValidationFunction;

export type ValidatorItem = {
  checkFunction: InnerValidationFunction;
  message: string;
};

export type CompositeValidateFunction = (value: string, equal?: string) => Array<string>;
