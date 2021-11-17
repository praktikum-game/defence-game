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

export function getDatetimeObject(date: Date) {
  const dateParts = {
    year: date.getFullYear(),
    month: date.getMonth(),
    dayOfMonth: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };

  const appendLeadZero = (item: number) => {
    if (item < 10) {
      return `0${Number}`;
    }
    return `${item}`;
  };

  const dateTimeObject = Object.fromEntries(
    Object.entries({ ...dateParts }).map(([key, value]) => [key, appendLeadZero(value)]),
  ) as DatetimeObject;

  return dateTimeObject;
}

export function formatDateTime(
  dtObj: DatetimeObject,
  dateFields: Array<keyof Partial<DatetimeObject>> = ['dayOfMonth', 'month', 'year'],
  timeFields: Array<keyof Partial<DatetimeObject>> = ['hours', 'minutes'],
  dateDelemiter: string = '.',
  timeDelemiter: string = ':',
): string {
  const dateString = dateFields.map((d) => dtObj[d]).join(dateDelemiter);
  const timeString = timeFields.map((t) => dtObj[t]).join(timeDelemiter);
  return `${dateString} ${timeString}`;
}
