import React from 'react';
import { isServer } from './utilities';
import { BrowserHistory, createBrowserHistory, createMemoryHistory, MemoryHistory } from 'history';

let history: MemoryHistory | BrowserHistory;

export function getHistory(initialEntries?: string[]) {
  if (history === undefined) {
    history = isServer
      ? createMemoryHistory({ initialEntries: initialEntries || ['/'] })
      : createBrowserHistory();
  }
  return history;
}

export const HistoryContext = React.createContext([]);
