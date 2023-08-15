import React from "react";

const QualitySelector = ({ selectedQuality, onQualityChange }) => {
  const qualityOptions = ["720p", "1080p", "auto"];

  return (
    <div>
      <label>Quality:</label>
      <select
        value={selectedQuality}
        onChange={(e) => onQualityChange(e.target.value)}
      >
        {qualityOptions.map((quality) => (
          <option key={quality} value={quality}>
            {quality}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QualitySelector;
