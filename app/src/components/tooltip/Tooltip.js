import React from "react";
import "./tooltip.css";
import PropTypes from "prop-types";

const Tooltip = ({ children, tooltipText }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip">{tooltipText}</span>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default Tooltip;
