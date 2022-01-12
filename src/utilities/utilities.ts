import { backendStaticUrl } from '../consts';
import defaultAvatar from '../components/Avatar/static/default-avatar.svg';
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

export function bindArgsFromN(fn: Function, n: number, ...bound_args: unknown[]) {
  return (...args: unknown[]) => fn(...args.slice(0, n - 1), ...bound_args);
}

export function getValueByKey<T, K extends keyof T>(obj: T | null, key: K): string {
  if (!obj) return '';

  const value = obj[key];

  if (typeof value === 'number' || typeof value === 'string') {
    return String(value);
  }
  return '';
}

export function getDateFormatter() {
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
}

export function getFullStaticUri(relativePath: string) {
  return `${encodeURI(backendStaticUrl)}${encodeURI(relativePath)}`;
}

export function normalizeAvatar(avatar: string): string {
  return avatar === null ? defaultAvatar : getFullStaticUri(avatar);
}
