import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
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

ModalContainer.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  children: PropTypes.node,
};

export default ModalContainer;
