import React, { ChangeEventHandler } from 'react';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { EditThreadModalProps } from './types';

export const EditThreadModal = (props: EditThreadModalProps) => {
  const { data, onChange } = props;

  const handleCloseModal = () => props.onClose();
  const handleSaveData = () => props.onSaveData();

  const handleInputFieldChange = (value: string) => {
    onChange('subject', value);
  };
  const handleTextareaFieldChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange('content', event.target.value);
  };

  return (
    <Modal visible={props.visible}>
      <InputField label="Тема" value={data?.subject} valueChangeCallback={handleInputFieldChange} />
      <textarea value={data?.content} onChange={handleTextareaFieldChange} />
      <div>
        <Button text="Сохранить" onClick={handleSaveData} />
        <Button text="Отмена" onClick={handleCloseModal} />
      </div>
    </Modal>
  );
};
