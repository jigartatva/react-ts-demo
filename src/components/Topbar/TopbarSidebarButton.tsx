import React from "react";
import PropTypes from "prop-types";

const icon = require(`../../assets/burger.svg`);

interface TopbarSidebarButtonProps {
  onClick?: () => void;
}

const TopbarSidebarButton = ({ onClick }: TopbarSidebarButtonProps) => {
  return (
    <div>
      <button
        type="button"
        className="topbar__button topbar__button--desktop"
        onClick={onClick}
      >
        <img src={icon} alt="" className="topbar__button-icon" />
      </button>
      <button
        type="button"
        className="topbar__button topbar__button--mobile"
        onClick={onClick}
      >
        <img src={icon} alt="" className="topbar__button-icon" />
      </button>
    </div>
  );
};

export default TopbarSidebarButton;
