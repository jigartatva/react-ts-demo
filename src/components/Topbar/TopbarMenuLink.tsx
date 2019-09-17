import React from "react";
import { Link } from "react-router-dom";

type TopbarMenuLinksProps = {
  title: string;
  icon: string;
  path: string;
};

const TopbarMenuLinks = ({ title, icon, path }: TopbarMenuLinksProps) => {
  return (
    <Link className="topbar__link" to={path}>
      <span className={`topbar__link-icon lnr lnr-${icon}`} />
      <p className="topbar__link-title">{title}</p>
    </Link>
  );
};

export default TopbarMenuLinks;
