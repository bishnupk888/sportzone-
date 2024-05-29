import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    backdropFilter: 'blur(5px)', // Blur effect
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none', // Remove border
    boxShadow: 'none', // Remove box shadow
    maxWidth: '80%', // Adjust as needed
    maxHeight: '80%', // Adjust as needed
    overflow: 'hidden', // Hide any overflow
    padding: 0,
    borderRadius: '10px', // Optional: Add border radius for rounded corners
    position: 'relative', // Ensure the modal content can position the close button
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.5)', // 50% transparent black background
    border: 'none',
    cursor: 'pointer',
    color: '#ffffff',
    fontSize: '2rem',
    padding: '5px', // Add padding for better visibility and clickability
    borderRadius: '20%', // Make it a circle
    zIndex: 1, // Ensure it's above the blurred background
  },
  closeButtonText: {
    position: 'relative',
    zIndex: 2, // Ensure it's above the blurred background
  },
  modalContent: {
    maxWidth: '100%',
    height: '100%', // Adjust to ensure the entire image is visible
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain', // Ensure the image fits inside without stretching
    borderRadius: '10px', // Optional: Add border radius for rounded corners
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
