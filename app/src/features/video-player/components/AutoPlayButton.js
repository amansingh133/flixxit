import React, { useState } from "react";
import Switch from "../../../components/switch/Switch";
import "../styles/AutoPlayButton.css";

const AutoPlayButton = ({ onAutoPlayChange }) => {
  const [autoPlayEnable, setAutoPlayEnable] = useState(true);

  const toggleAutoPlay = () => {
    const value = !autoPlayEnable;
    setAutoPlayEnable(!autoPlayEnable);
    onAutoPlayChange(value);
  };

  return (
    <div className="autoplay-btn-container">
      <Switch
        label={"Autoplay"}
        checked={autoPlayEnable}
        handler={toggleAutoPlay}
      />
    </div>
  );
};

export default AutoPlayButton;
