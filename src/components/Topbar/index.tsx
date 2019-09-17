import React from "react";
import { Link } from "react-router-dom";
import TopbarSidebarButton from "./TopbarSidebarButton";
import TopbarProfile from "./TopbarProfile";
import TopbarLanguage from './TopbarLanguage';
import { User } from "../../models/users";

interface TopbarProps {
  changeMobileSidebarVisibility?: () => void;
  logout: () => void;
  userInfo: User;
}

const Topbar = ({
  changeMobileSidebarVisibility,
  logout,
  userInfo
}: TopbarProps) => {
  return (
    <div className="topbar">
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <TopbarSidebarButton onClick={changeMobileSidebarVisibility} />
          <Link className="topbar__logo" to="/admin" />
        </div>
        <div className="topbar__right">
          <TopbarLanguage />
          <TopbarProfile userInfo={userInfo} logout={logout} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
