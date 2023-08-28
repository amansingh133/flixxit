import React from "react";
import "./Switch.css";

const Switch = ({ label, checked, handler }) => {
  return (
    <div className="switch-container">
      <p>{label}</p>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="switch-checkbox"
          name={label}
          id={label}
          checked={checked}
          onChange={handler}
        />
        <label
          style={{ background: checked && "#06D6A0" }}
          className="switch-label"
          htmlFor={label}
        >
          <span className="switch-button" />
        </label>
      </div>
    </div>
  );
};

export default Switch;
