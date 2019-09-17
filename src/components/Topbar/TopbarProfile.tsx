import React, { useState } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import { User } from "../../models/users";
import { useTranslation } from "react-i18next";

const Ava = require("../../assets/ava.png");

type TopbarProfileProps = {
  userInfo: User;
  logout?: () => void;
};

const TopbarProfile = (props: TopbarProfileProps) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };
  const { userInfo } = props;
  const { t } = useTranslation();

  return (
    <div className="topbar__profile">
      <button type="button" className="topbar__avatar" onClick={toggle}>
        <img className="topbar__avatar-img" src={Ava} alt="avatar" />
        <p className="topbar__avatar-name">
          {userInfo && `${userInfo.first_name} ${userInfo.last_name}`}
        </p>
        <DownIcon className="topbar__icon" />
      </button>
      {collapse && (
        <button type="button" className="topbar__back" onClick={toggle} />
      )}
      <Collapse isOpen={collapse} className="topbar__menu-wrap">
        <div className="topbar__menu">
          <a className="topbar__link" href="#" onClick={() => props.logout()}>
            <span className={`topbar__link-icon lnr lnr-exit`} />
            <p className="topbar__link-title">{t("Logout")}</p>
          </a>
        </div>
      </Collapse>
    </div>
  );
};

export default TopbarProfile;
