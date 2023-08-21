import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Message.css";

const Message = ({ message }) => {
  return (
    <div className="message-page">
      <Navbar />
      <h1 className="message-section">{message}</h1>
    </div>
  );
};

export default Message;
