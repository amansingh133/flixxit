import "./tooltip.css";

const Tooltip = ({ children, tooltipText }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip">{tooltipText}</span>
    </div>
  );
};

export default Tooltip;
