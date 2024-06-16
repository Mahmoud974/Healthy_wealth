import React from 'react';
import Modal from 'modal-md-reactjs';
import PropTypes from 'prop-types';

const modalParameter = {
  backgroundColor: "#EEEEEE",
  borderRadius: 10,
  boxShadow: "0 0 5px #1B1919",
  color: "#1B1919",
  fontSize: 18,
  height: "fit-content",
  padding: "20px 50px",
  width: "fit-content"
};

const ModalReact = ({ isModalOpen, modalMessage, closeModal }) => {
  return (
    <Modal 
      id="modal-created" 
      showModal={isModalOpen} 
      closeModal={closeModal} 
      parameter={modalParameter} 
      message={modalMessage}
    >
      <h2 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Notification</h2>
      <p style={{ marginBottom: '1rem' }}>{modalMessage}</p>
      <button onClick={closeModal} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
        Close
      </button>
    </Modal>
  );
};

ModalReact.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  modalMessage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalReact;
