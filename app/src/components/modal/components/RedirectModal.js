import React from "react";
import ModalContainer from "./ModalContainer";
import { Link } from "react-router-dom";
import "../styles/RedirectModal.css";

const RedirectModal = ({
  message,
  linkTo,
  linkText,
  openModal,
  closeModal,
}) => {
  return (
    <ModalContainer isOpen={openModal} onRequestClose={closeModal}>
      <div className="redirect-modal-content">
        <p>{message}</p>
        <Link className="redirect-link" to={linkTo} onClick={closeModal}>
          {linkText}
        </Link>
      </div>
    </ModalContainer>
  );
};

export default RedirectModal;
