import React from 'react';
import ReactModal, { Styles } from 'react-modal';

ReactModal.setAppElement('*');

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  width?: number;
  height?: number;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  width,
  height,
  children,
  isOpen,
  handleClose,
}: ModalProps) => {
  const styles: Styles = {
    overlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backdropFilter: 'blur(2px)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 15,
    },
    content: {
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      borderRadius: '4px',
      margin: 'auto',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: '#ffffff',
      boxShadow:
        '0 5px 5px - 3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 8px 10px 1px rgba(0, 0, 0, 0.14)',
    },
  };

  return (
    <ReactModal
      style={styles}
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

Modal.defaultProps = {
  width: 400,
  height: 200,
};
