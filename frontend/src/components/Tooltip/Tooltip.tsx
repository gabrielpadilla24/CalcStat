import React from "react";
import "./Tooltip.css";

interface TooltipProps {
  message: string;
  width?: string; // Optional, e.g., "300px", "180px"
}

const Tooltip: React.FC<TooltipProps> = ({ message, width }) => {
  return (
    <div className="tooltip-container">
      <div className="tooltip-icon">
        i
        <div className="tooltip-text" style={width ? { width } : {}}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
