import React from 'react';
import { block } from 'bem-cn';
import { Title } from '../../../../../components/Title';
import { Avatar } from '../../../../../components/Avatar';
import { getDateFormatter } from '../../../../../utilities';
import { MessageItemProps } from './types';

import './message-item.css';
import { Button } from 'components/Button';

const b = block('message-list-item');
const bItem = block('item-content');

const formatter = getDateFormatter();

export const MessageItem = ({ className, messageData, replyClick }: MessageItemProps) => {
  const { date, user, text } = messageData;
  return (
    <div className={b.mix(className)}>
      <div className={b('item-content')}>
        <Avatar className={bItem('avatar')} />

        <div className={bItem('body')}>
          <div className={bItem('header')}>
            <Title headingLevel={4} align="left" className={bItem('user')}>
              {user}
            </Title>
            <div className={bItem('date')}>от {formatter.format(new Date(date))}</div>
          </div>
          <div>
            <p className={bItem('text')}>{text}</p>
          </div>
          {replyClick !== undefined ? (
            <Button text="Ответить" onClick={replyClick} isSmall={true}></Button>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};
