import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Title } from '../../../../../components/Title';

import './thread-list-item.css';
import { ThreadListItemProps } from '.';
import { formatDateTime, getDatetimeObject } from '../../../../../utilities/utilities';
import { Avatar } from '../../../../../components/Avatar';

const b = block('thread-list-item');

const formatDate = (date: Date) => formatDateTime(getDatetimeObject(date));

export const Item = ({ className, dataItem }: ThreadListItemProps): JSX.Element => {
  const { headerText, createdDate, createdUser, threadId, messagesCount, lastChange } = dataItem;
  useEffect(() => console.log('effect'), []);
  return (
    <div className={b.mix(className)}>
      <div className={b('item-content')}>
        <Avatar className="item-content__avatar" />

        <div className="item-content__texts">
          <Link to={`/forum/${threadId}`}>
            <Title headingLevel={4} align="left" className="item-content__header">
              {headerText}
            </Title>
          </Link>
          <div>
            Создана пользователем: {createdUser} {formatDate(createdDate)}
          </div>
          <div>Последние изменения: {formatDate(lastChange)}</div>
        </div>
      </div>

      <div className={b('counter')}>Количество сообщений: {messagesCount}</div>
    </div>
  );
};
