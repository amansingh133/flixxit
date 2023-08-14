import React from "react";

const CheckboxGroup = ({ title, options, field, handleCheckBox }) => {
  return (
    <div className="label-wrapper">
      <h3 className="preference-title">{title}</h3>
      <div className="preference-labels-container">
        {options.map((option) => (
          <label className="preference-labels" key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              onChange={(e) => handleCheckBox(field, e.target.value)}
              className="custom-checkbox-input"
            />
            <div className="custom-checkbox">
              <div className="checkmark">&#10004;</div>
            </div>
            <p className="checkbox-label">{option.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
export default CheckboxGroup;
