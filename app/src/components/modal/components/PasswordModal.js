import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "../styles/PasswordModal.css";

const PasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const passwordRules = [
    {
      description: "Password must be between 6 and 16 characters.",
      regex: /.{6,16}/,
    },
    {
      description: "Password must contain at least one uppercase letter.",
      regex: /[A-Z]/,
    },
    {
      description: "Password must contain at least one lowercase letter.",
      regex: /[a-z]/,
    },
    {
      description: "Password must contain at least one digit.",
      regex: /[0-9]/,
    },
    {
      description: "Password must contain at least one special character.",
      regex: /[!@#$%^&*]/,
      allowedChars: "! @ # $ % ^ & *",
    },
  ];

  return (
    <div className="password-modal">
      <BsFillInfoCircleFill
        className="password-modal-info"
        onClick={openModal}
        color="#FFD700"
        size={24}
      />

      <ModalContainer isOpen={isOpen} onRequestClose={closeModal}>
        <div className="password-modal-title-contianer">
          <h2>Password Rules</h2>
          <AiFillCloseCircle
            className="reset-close-icon"
            onClick={closeModal}
            size={32}
            color="white"
          />
        </div>
        <ul className="password-rules-lists">
          {passwordRules &&
            passwordRules.map((rule, index) => (
              <li key={index}>
                {rule.description}
                {rule.allowedChars && (
                  <span style={{ marginLeft: "8px" }}>
                    (Allowed characters: {rule.allowedChars})
                  </span>
                )}
              </li>
            ))}
        </ul>
      </ModalContainer>
    </div>
  );
};

export default PasswordModal;
