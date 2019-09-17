import React from "react";
import { Badge } from "reactstrap";
import { NavLink } from "react-router-dom";

interface SidebarLinkProps {
  title?: string;
  icon?: string;
  newLink?: boolean;
  route?: string;
  onClick?: () => void;
}

const SidebarLinkDefaultProps: SidebarLinkProps = {
  title: "",
  icon: "",
  newLink: false,
  route: "/"
};

const SidebarLink: React.SFC<SidebarLinkProps> = ({
  title,
  icon,
  newLink,
  route,
  onClick
}) => {
  return (
    <NavLink
      to={route}
      onClick={onClick}
      activeClassName="sidebar__link-active"
    >
      <li className="sidebar__link">
        {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ""}
        <p className="sidebar__link-title">
          {title}
          {newLink ? (
            <Badge className="sidebar__link-badge">
              <span>New</span>
            </Badge>
          ) : (
              ""
            )}
        </p>
      </li>
    </NavLink>
  );
};

SidebarLink.defaultProps = SidebarLinkDefaultProps;

export default SidebarLink;
