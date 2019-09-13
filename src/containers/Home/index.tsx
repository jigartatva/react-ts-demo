import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../../store/App/actions";
import { State } from "../../store/rootReducer";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";

const logo = require("../../assets/logo.svg");

interface DispatchProps {
  toggleSidebar: () => void;
  showSidebar: boolean;
}

const Home = ({ toggleSidebar, showSidebar }: DispatchProps) => {
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
    <div>
      <Topbar changeMobileSidebarVisibility={changeMobileSidebarVisibility} />
      {showSidebar ? <img src={logo} /> : null}
      <Sidebar
        sidebar={sidebar}
        changeToDark={changeToDark}
        changeToLight={changeToLight}
        changeMobileSidebarVisibility={changeMobileSidebarVisibility}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    showSidebar: state.app.showSidebar
  };
};

export default connect(
  mapStateToProps,
  { toggleSidebar }
)(Home);
