import React from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from './types';
import './modal.css';

export const Modal = ({ children, visible }: ModalProps): JSX.Element => {
  if (!visible) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div>{children}</div>
      </div>
    </>,
    document.querySelector('#portal')!,
  );
};
