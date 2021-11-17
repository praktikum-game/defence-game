export type ThreadListItemData = {
  headerText: string;
  createdUser: string;
  createdDate: Date;
  lastChange: Date;
  threadId: string;
  messagesCount: number;
};

export type ThreadListItemProps = {
  className?: string;
  dataItem: ThreadListItemData;
};
