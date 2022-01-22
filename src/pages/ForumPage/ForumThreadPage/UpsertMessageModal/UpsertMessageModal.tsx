import React, { useCallback, useState } from 'react';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { UpsertMessageModalProps } from './types';
import { TextArea, TextAreaCursorPosition } from 'components/TextArea';
import block from 'bem-cn';

import { BaseEmoji } from 'emoji-mart';
import { EmojiPanel } from 'components/EmojiPanel';

import './UpsertMessageModal.css';

const b = block('add-topic-modal');

export const UpsertMessageModal = ({ data, onChange, ...props }: UpsertMessageModalProps) => {
  const [textareaCursorPosition, setTextareaCursorPosition] = useState<TextAreaCursorPosition>({
    selectionStart: 0,
    selectionEnd: 0,
  });

  const handleCloseModal = () => props.onClose();

  const handleTextareaChange = useCallback(
    (_0: string, value: string) => {
      onChange(value);
    },
    [onChange],
  );

  const handleTextareaSelect = useCallback((position: TextAreaCursorPosition) => {
    setTextareaCursorPosition(position);
  }, []);

  const handleEmojiSelect = useCallback(
    (emoji: BaseEmoji) => {
      const { selectionStart, selectionEnd } = textareaCursorPosition;
      let val = data;
      val = val.substring(0, selectionStart) + emoji.native + val.substring(selectionEnd);
      setTextareaCursorPosition({ selectionStart, selectionEnd });
      onChange(val);
    },
    [data, textareaCursorPosition, onChange],
  );

  return (
    <Modal visible={props.visible}>
      <div className={b('message')}>
        <TextArea
          name="content"
          label="Ваше сообщение"
          onSelect={handleTextareaSelect}
          onChange={handleTextareaChange}
          value={data}
        />
        <EmojiPanel onEmojiSelect={handleEmojiSelect} />
      </div>

      <div className={b('buttons')}>
        <Button text="Сохранить" disabled={!data} onClick={props.onSaveData} isSmall={true} />
        <Button text="Отмена" view="secondary" isSmall={true} onClick={handleCloseModal} />
      </div>
    </Modal>
  );
};
