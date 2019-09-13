import React from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

interface SidebarContentProps {
  changeToDark?: () => void;
  changeToLight?: () => void;
  onClick?: () => void;
}

const SidebarContent = ({
  changeToDark,
  changeToLight,
  onClick
}: SidebarContentProps) => {
  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarLink title="Users" route="/admin/users" icon="users" />
      </ul>
    </div>
  );
};

export default SidebarContent;
