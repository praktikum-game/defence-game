import {  ViewType } from './types';

export function getViewTypes(name: string): ViewType {
  return {
    primary: `${name}_primary`,
    secondary: `${name}_secondary`,
    success: `${name}_success`,
    error: `${name}_error`,
    info: `${name}_info`,
    warning: `${name}_warning`,
  };
}

// Bind arguments starting with argument number "n".
export function bindArgsFromN(fn: Function, n: number, ...bound_args: unknown[]) {
  return (...args: unknown[]) => fn(...args.slice(0, n - 1), ...bound_args);
}
