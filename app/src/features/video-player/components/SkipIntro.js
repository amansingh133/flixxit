import React from "react";
import "../styles/SkipIntro.css";

const SkipIntro = ({ currentTime, onSkipIntro }) => {
  if (currentTime >= 5 && currentTime <= 20) {
    return (
      <button onClick={onSkipIntro} className="skip-intro-button">
        Skip Intro
      </button>
    );
  }
  return null;
};

export default SkipIntro;
