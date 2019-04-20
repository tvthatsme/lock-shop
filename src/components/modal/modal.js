import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, ...props }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} {...props}>
      {props.children}
    </Modal>
  );
};

export default CustomModal;
