import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TopbarSidebarButton from "./TopbarSidebarButton";
import TopbarProfile from "./TopbarProfile";

interface TopbarProps {
  changeMobileSidebarVisibility?: () => void;
}

const Topbar = ({ changeMobileSidebarVisibility }: TopbarProps) => {
  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <TopbarSidebarButton onClick={changeMobileSidebarVisibility} />
          <Link className="topbar__logo" to="/admin" />
        </div>
        <div className="topbar__right">
          <TopbarProfile />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
