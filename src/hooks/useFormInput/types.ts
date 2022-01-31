export type FormOutputObject = { value: string; messages: Array<string> };

export type FormInputHookResult = [
  FormOutputObject,
  (val: string, equal?: string | undefined) => void,
];
