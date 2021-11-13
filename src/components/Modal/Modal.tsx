import React, { Fragment } from 'react';
import './modal.css';

type Props = {
  children?: React.ReactNode;
  visible: boolean;
};

export const Modal = (props: Props): JSX.Element => (
  <Fragment>
    {props.visible && (
      <div>
        <div>{props.children}</div>
      </div>
    )}
  </Fragment>
);
