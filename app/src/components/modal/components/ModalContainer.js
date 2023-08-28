import React from "react";
import Modal from "react-modal";
import "../styles/ModalContainer.css";

const ModalContainer = ({ isOpen, onRequestClose = () => {}, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="modal-container"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
