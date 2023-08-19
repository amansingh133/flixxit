import React from "react";

const QualitySelector = ({
  qualityOptions,
  networkStrength,
  onSelectQuality,
}) => {
  const handleQualityChange = (e) => {
    const selectedQuality = e.target.value;
    onSelectQuality(selectedQuality);
  };

  const autoQuality = networkStrength === "4g" ? "1080P" : "720P";

  return (
    <select
      onChange={handleQualityChange}
      name="qualitySelector"
      className="quality-selector"
      id="qualitySelector"
    >
      {qualityOptions.map((option, index) => (
        <option key={index} value={option}>
          {option === "AUTO" ? `${option} (${autoQuality})` : option}
        </option>
      ))}
    </select>
  );
};

export default QualitySelector;
