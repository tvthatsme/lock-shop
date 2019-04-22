import React, { useLayoutEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, ...props }) => {
  // Lock the background behind the modal from scrolling when the modal is open
  useLayoutEffect(() => {
    // Keep track of the original style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';

    return () => (document.body.style.overflow = originalStyle);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      {...props}
    >
      {props.children}
    </Modal>
  );
};

export default CustomModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#f9f8ff',
    minWidth: '50vw',
    maxHeight: '80vh'
  },
  overlay: {
    backgroundColor: 'rgb(13, 20, 51, 0.8)'
  }
};
