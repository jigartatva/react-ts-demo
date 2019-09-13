import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../../store/App/actions";
import { RootState } from "../../store/rootReducer";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  toggleSidebar: () => void;
  showSidebar: boolean;
}

const Layout = ({ children, toggleSidebar, showSidebar }: LayoutProps) => {
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

  return (
    <div className="theme-light">
      <div className="wrapper">
        <Topbar changeMobileSidebarVisibility={changeMobileSidebarVisibility} />
        <Sidebar
          sidebar={sidebar}
          changeToDark={changeToDark}
          changeToLight={changeToLight}
          changeMobileSidebarVisibility={changeMobileSidebarVisibility}
        />
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    showSidebar: state.app.showSidebar
  };
};

export default connect(
  mapStateToProps,
  { toggleSidebar }
)(Layout);
