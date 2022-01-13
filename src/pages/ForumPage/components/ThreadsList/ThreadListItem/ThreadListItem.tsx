import React from 'react';
import { Link } from 'react-router-dom';
import { block } from 'bem-cn';
import { Title } from '../../../../../components/Title';

import './thread-list-item.css';
import { ThreadListItemProps } from '.';
import { Avatar } from '../../../../../components/Avatar';
import { getDateFormatter } from '../../../../../utilities';
import { Button } from 'components/Button';

const b = block('thread-list-item');

const formatter = getDateFormatter();

export const Item = ({
  className,
  dataItem,
  isAuthor,
  onRemoveClick,
  onEditClick,
}: ThreadListItemProps): JSX.Element => {
  const { id, messagesCount, content, subject, createdAt, updatedAt, user } = dataItem;

  const handleEditClick = () => onEditClick(id);

  const handleRemoveClick = () => onRemoveClick(id);

  return (
    <div className={b.mix(className)}>
      <div className={b('item-content')}>
        <Avatar className="item-content__avatar" />

        <div className="item-content__texts">
          <Link to={`/forum/${id}`}>
            <Title headingLevel={4} align="left" className="item-content__header">
              {subject}
            </Title>
          </Link>
          <p>{content}</p>
          <div>
            Создана пользователем: {user.name} {formatter.format(new Date(createdAt))}
          </div>
          <div>Последние изменения: {formatter.format(new Date(updatedAt))}</div>
        </div>
      </div>
      <div>
        <div className={b('counter')}>Количество сообщений: {messagesCount}</div>
        {isAuthor && (
          <div>
            <Button text="Изменить" view="secondary" onClick={handleEditClick} />
            <Button text="Удалить" view="warning" onClick={handleRemoveClick} />
          </div>
        )}
      </div>
    </div>
  );
};
