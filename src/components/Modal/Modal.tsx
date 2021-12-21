import React from 'react';
import { ModalProps } from './types';
import './modal.css';

export const Modal = ({ children, visible }: ModalProps): JSX.Element | null => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div>{children}</div>
      </div>
    </>
  );
};
