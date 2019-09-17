import React, { useState } from "react";
import { Collapse } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";

interface SidebarCategoryProps {
  title: string;
  icon?: string;
  isNew?: boolean;
  children?: [];
}

const SidebarCategoryDefaultProps: SidebarCategoryProps = {
  title: "",
  icon: "",
  isNew: false,
  children: []
};

const SidebarCategory: React.SFC<SidebarCategoryProps> = ({
  title,
  icon,
  isNew,
  children
}) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  const categoryClass = classNames({
    "sidebar__category-wrap": true,
    "sidebar__category-wrap--open": collapse
  });

  return (
    <div className={categoryClass}>
      <button
        type="button"
        className="sidebar__link sidebar__category"
        onClick={toggle}
      >
        {icon ? <span className={`sidebar__link-icon lnr lnr-${icon}`} /> : ""}
        <p className="sidebar__link-title">
          {title}
          {isNew && <span className="sidebar__category-new" />}
        </p>
        <span className="sidebar__category-icon lnr lnr-chevron-right" />
      </button>
      <Collapse isOpen={collapse} className="sidebar__submenu-wrap">
        <ul className="sidebar__submenu">
          <div>{children}</div>
        </ul>
      </Collapse>
    </div>
  );
};

SidebarCategory.defaultProps = SidebarCategoryDefaultProps;

export default SidebarCategory;
