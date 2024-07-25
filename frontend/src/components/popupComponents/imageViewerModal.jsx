import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)', 
    zIndex: 100
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none', 
    boxShadow: 'none', 
    maxWidth: '80%', 
    maxHeight: '80%', 
    overflow: 'hidden', 
    padding: 0,
    borderRadius: '10px', 
    position: 'relative', 
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.5)', 
    border: 'none',
    cursor: 'pointer',
    color: '#ffffff',
    fontSize: '2rem',
    padding: '5px', 
    borderRadius: '20%', 
    zIndex: 1, 
  },
  closeButtonText: {
    position: 'relative',
    zIndex: 2, 
  },
  modalContent: {
    maxWidth: '100%',
    height: '100%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain', 
    borderRadius: '10px', 
  },
};

const CustomModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button className="modal-close" onClick={onClose} style={customStyles.closeButton}>
        <span aria-hidden="true" style={customStyles.closeButtonText}> ✕ </span>
      </button>
      <div className="modal-content" style={customStyles.modalContent}>
        <img src={imageUrl} alt="Certificate" style={customStyles.modalImage} />
      </div>
    </Modal>
  );
};

export default CustomModal;

