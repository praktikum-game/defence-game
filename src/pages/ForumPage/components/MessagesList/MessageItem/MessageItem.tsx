import React from 'react';
import { block } from 'bem-cn';
import { Title } from '../../../../../components/Title';
import { Avatar } from '../../../../../components/Avatar';
import { getDateFormatter } from '../../../../../utilities/utilities';
import { MessageItemProps } from './types';

// import './thread-list-item.css';

const b = block('message-list-item');
const formatter = getDateFormatter();

export const MessageItem = ({ className, message }: MessageItemProps) => {
  const { date, user } = message;
  return (
    <div className={b.mix(className)}>
      <div className={b('item-content')}>
        <Avatar className="item-content__avatar" />

        <div className="item-content__texts">
          <Title headingLevel={4} align="left" className="item-content__header">
            {user}
          </Title>

          <div>{formatter.format(new Date(date))}</div>
          <div>Последние изменения: {formatter.format(new Date(date))}</div>
        </div>
      </div>
    </div>
  );
};
