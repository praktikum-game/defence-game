import React, { useEffect, useState } from 'react';
import { block } from 'bem-cn';
import { Title } from '../../../../../components/Title';
import { Avatar } from '../../../../../components/Avatar';
import { getDateFormatter, normalizeAvatar } from '../../../../../utilities';
import { MessageItemProps } from './types';

import './message-item.css';
import { Button } from 'components/Button';

const b = block('message-list-item');
const bItem = block('item-content');

const formatter = getDateFormatter();

export const MessageItem = ({ className, messageData, replyClick, isReply }: MessageItemProps) => {
  const { date, userName, content, userAvatar } = messageData;
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (userAvatar !== null) {
      if (userAvatar.startsWith('https')) {
        setAvatarSrc(userAvatar);
      } else {
        const normalizedAvatar = normalizeAvatar(userAvatar);
        setAvatarSrc(normalizedAvatar);
      }
    }
  }, [setAvatarSrc, userAvatar]);

  return (
    <div className={b.mix(className, b({ reply: isReply }))}>
      <div className={b('item-content')}>
        {avatarSrc === undefined ? (
          <Avatar className={bItem('avatar')} />
        ) : (
          <Avatar src={avatarSrc} className={bItem('avatar')} />
        )}

        <div className={bItem('body')}>
          <div className={bItem('header')}>
            <Title headingLevel={4} align="left" className={bItem('user')}>
              {userName}
            </Title>
            <div className={bItem('date')}>от {formatter.format(new Date(date))}</div>
          </div>
          <div>
            <p className={bItem('text')}>{content}</p>
          </div>
          {replyClick !== undefined ? (
            <Button text="Ответить" onClick={replyClick} isSmall={true}></Button>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};
