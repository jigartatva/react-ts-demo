import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarLink
          title={t("sidebar.Dashboard")}
          route="/admin"
          icon="home"
        />
        <SidebarLink
          title={t("sidebar.Users Layout 1")}
          route="/admin/users"
          icon="users"
        />
        <SidebarLink
          title={t("sidebar.Users Layout 2")}
          route="/admin/users-2"
          icon="users"
        />
      </ul>
    </div>
  );
};

export default SidebarContent;
