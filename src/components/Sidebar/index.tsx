import React from "react";
import Scrollbar from "react-smooth-scrollbar";
import classNames from "classnames";
import PropTypes from "prop-types";
import SidebarContent from "./SidebarContent";

interface SidebarWidgetProps {
  sidebar: {
    show: boolean;
    collapse: boolean;
  };
  changeToDark?: () => void;
  changeToLight?: () => void;
  changeMobileSidebarVisibility?: () => void;
}

const Sidebar = ({
  sidebar,
  changeToDark,
  changeToLight,
  changeMobileSidebarVisibility
}: SidebarWidgetProps) => {
  const sidebarClass = classNames({
    sidebar: true,
    "sidebar--show": sidebar.show,
    "sidebar--collapse": sidebar.collapse
  });

  return (
    <div className={sidebarClass}>
      <Scrollbar className="sidebar__scroll scroll">
        <div className="sidebar__wrapper sidebar__wrapper--desktop">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
          />
        </div>
        <div className="sidebar__wrapper sidebar__wrapper--mobile">
          <SidebarContent
            onClick={changeMobileSidebarVisibility}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
          />
        </div>
      </Scrollbar>
    </div>
  );
};

export default Sidebar;
