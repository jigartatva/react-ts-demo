import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../../store/App/actions";
import { RootState } from "../../store/rootReducer";
import Layout from "../../components/Layout";

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

  return <Layout>{showSidebar ? <img src={logo} /> : null}</Layout>;
};

const mapStateToProps = (state: RootState) => {
  return {
    showSidebar: state.app.showSidebar
  };
};

export default connect(
  mapStateToProps,
  { toggleSidebar }
)(Home);
