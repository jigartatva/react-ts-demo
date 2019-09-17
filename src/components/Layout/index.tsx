import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import classNames from "classnames";
import { toggleSidebar } from "../../store/App/actions";
import { RootState } from "../../store/rootReducer";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { authLogout } from "../../store/Auth/actions";
import { User } from "../../models/users";

interface LayoutProps {
  children: React.ReactNode;
  toggleSidebar: () => void;
  authLogout: () => void;
  showSidebar: boolean;
  userInfo: User;
}

const Layout = ({
  children,
  toggleSidebar,
  showSidebar,
  authLogout,
  userInfo
}: LayoutProps) => {
  const sidebar = { show: showSidebar, collapse: !showSidebar };

  const changeToDark = () => {
    console.log("changeToDark");
  };

  const changeToLight = () => {
    console.log("changeToLight");
  };

  const changeMobileSidebarVisibility = () => {
    toggleSidebar();
  };

  const layoutClass = classNames({
    layout: true,
    "layout--collapse": sidebar.collapse
  });

  return (
    <div className="theme-light">
      <div className="wrapper">
        <div className={layoutClass}>
          <Topbar
            userInfo={userInfo}
            logout={authLogout}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
          <Sidebar
            sidebar={sidebar}
            changeToDark={changeToDark}
            changeToLight={changeToLight}
            changeMobileSidebarVisibility={changeMobileSidebarVisibility}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    showSidebar: state.app.showSidebar,
    userInfo: _.get(state.auth, "user", null)
  };
};

export default connect(
  mapStateToProps,
  { toggleSidebar, authLogout }
)(Layout);
