import { ViewType } from './types';

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

export function getValueByKey<T, K extends keyof T>(obj: T | null, key: K): string {
  if (!obj) return '';

  const value = obj[key];

  if (typeof value === 'number' || typeof value === 'string') {
    return value as string;
  }
  return '';
}
