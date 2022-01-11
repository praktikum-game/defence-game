import React, { useCallback, useState } from 'react';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { UpsertThreadModalProps } from './types';
import { TextArea, TextAreaCursorPosition } from 'components/TextArea';
import { ForumThreadCreationModel } from 'api/forum-topics';
import block from 'bem-cn';

import { BaseEmoji } from 'emoji-mart';
import { EmojiPanel } from 'components/EmojiPanel';

import './upsert-thread-modal.css';

const b = block('add-topic-modal');

export const UpsertThreadModal = ({ data, onChange, ...props }: UpsertThreadModalProps) => {
  const [textareaCursorPosition, setTextareaCursorPosition] = useState<TextAreaCursorPosition>({
    selectionStart: 0,
    selectionEnd: 0,
  });

  const handleSaveData = useCallback(() => props.onSaveData(), [props]);

  const handleCloseModal = () => props.onClose();

  const handleInputChange = useCallback((value: string) => onChange('subject', value), [onChange]);

  const handleTextareaChange = useCallback(
    (fieldName: string, value: string) =>
      onChange(fieldName as keyof ForumThreadCreationModel, value),
    [onChange],
  );

  const handleTextareaSelect = useCallback((position: TextAreaCursorPosition) => {
    setTextareaCursorPosition(position);
  }, []);

  const handleEmojiSelect = useCallback(
    (emoji: BaseEmoji) => {
      const { selectionStart, selectionEnd } = textareaCursorPosition;
      let val = data.content;
      val = val.substring(0, selectionStart) + emoji.native + val.substring(selectionEnd);
      setTextareaCursorPosition({ selectionStart, selectionEnd });
      onChange('content', val);
    },
    [data.content, textareaCursorPosition, onChange],
  );

  return (
    <Modal visible={props.visible}>
      <InputField
        valueChangeCallback={handleInputChange}
        label="Тема"
        name="subject"
        autoComplete="off"
        value={data.subject}
      />
      <div className={b('message')}>
        <TextArea
          name="content"
          label="Ваше сообщение"
          onSelect={handleTextareaSelect}
          onChange={handleTextareaChange}
          value={data.content}
        />
        <EmojiPanel onEmojiSelect={handleEmojiSelect} />
      </div>

      <div className={b('buttons')}>
        <Button
          text="Сохранить"
          disabled={!data.content || !data.subject}
          onClick={handleSaveData}
        />
        <Button text="Отмена" view="secondary" onClick={handleCloseModal} />
      </div>
    </Modal>
  );
};
