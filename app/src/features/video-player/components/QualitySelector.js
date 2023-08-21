import React, { useState, useRef } from "react";
import "../styles/QualitySelector.css";

import { FaAngleDown } from "react-icons/fa";

const QualitySelector = ({
  qualityOptions,
  networkStrength,
  onSelectQuality,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuality, setSelelectedQuality] = useState("AUTO");
  const selectorRef = useRef(null);

  const handleQualityChange = (quality) => {
    setSelelectedQuality(quality);
    onSelectQuality(quality);
    setIsOpen(false);
  };

  const autoQuality = networkStrength === "4g" ? "1080P" : "720P";

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!selectorRef.current.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  return (
    <div className="quality-selector">
      <div
        className={`custom-select ${isOpen ? "open-selector" : ""}`}
        onClick={toggleSelect}
        onBlur={handleBlur}
        ref={selectorRef}
        tabIndex="0"
      >
        {selectedQuality === "AUTO" ? `AUTO (${autoQuality})` : selectedQuality}
        <FaAngleDown className="arrow-icon" />
        <div className="options">
          {qualityOptions.map((option, index) => (
            <div
              key={index}
              className={`option ${
                selectedQuality === option ? "selectedOption" : ""
              }`}
              onClick={() => handleQualityChange(option)}
            >
              {option === "AUTO" ? `${option} (${autoQuality})` : option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualitySelector;
