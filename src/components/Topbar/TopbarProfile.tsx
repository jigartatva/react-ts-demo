import React, { useState } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";

const Ava = require("../../assets/ava.png");

type TopbarProfileState = {
  collapse: boolean;
};

const TopbarProfile = () => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={toggle}>
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <p className="topbar__avatar-name">Guest User</p>
        <DownIcon className="topbar__icon" />
      </button>
      {collapse && (
        <button type="button" className="topbar__back" onClick={toggle} />
      )}
      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <TopbarMenuLink title="Log Out" icon="exit" path="/login" />
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;
