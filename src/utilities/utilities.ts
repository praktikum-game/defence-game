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
