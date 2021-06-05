/* eslint-disable react/prop-types */
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('*');

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  handleClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
