import Modal from 'react-modal';
import PropTypes from 'prop-types';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: 'white',
    color: "#010101",
    fontWeight: "bold"
  },
};
const ModalReact = ({ isModalOpen, modalMessage, closeModal }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Notification"
      style={customStyles}
      className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-lg font-bold mb-4">Notification</h2>
      <p className="mb-4">{modalMessage}</p>
      <button onClick={closeModal} className="bg-tropical text-white px-4 py-2 rounded">
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
