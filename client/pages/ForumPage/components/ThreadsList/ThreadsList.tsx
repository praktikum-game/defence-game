import React from 'react';
import { Item } from './ThreadListItem/ThreadListItem';
import { ThreadsListProps } from './types';
import './thread-list.css';

export const ThreadsList = ({ children }: ThreadsListProps): JSX.Element => (
  <div className="thread-list-container">{children}</div>
);

ThreadsList.Item = Item;
