import React, { useCallback } from 'react';
import { InputField } from 'components/InputField';
import { Modal } from 'components/Modal';
import { forumTopicsAPI } from 'api/forum-topics';
import { Button } from 'components/Button';
import { Form } from 'components/Form';
import { AddThreadModalProps } from './types';

export const AddThreadModal = (props: AddThreadModalProps) => {
  const handleAddThread = useCallback((data: FormData): Promise<unknown> => {
    return forumTopicsAPI.create({
      content: String(data.get('content')),
      subject: String(data.get('subject')),
    });
  }, []);

  const handleCloseModal = () => props.onClose();

  return (
    <Modal visible={props.visible}>
      <Form controllerCallback={handleAddThread}>
        <InputField label="Тема" name="subject" autoComplete="off" />
        <textarea name="content" autoComplete="off" />
        <div>
          <Button text="Ok" type="submit" />
          <Button text="Отмена" onClick={handleCloseModal} />
        </div>
      </Form>
    </Modal>
  );
};
