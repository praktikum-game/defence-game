import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

type Props = {
  children?: React.ReactNode;
  visible: boolean;
};

export const Modal = ({ children, visible }: Props): JSX.Element => {
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
