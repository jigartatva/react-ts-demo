import React from "react";
import { connect } from "react-redux";

import { toggleSidebar } from "../../store/App/actions";
import { RootState } from "../../store/rootReducer";

const logo = require("../../assets/logo.svg");

interface HomeProps { }

const Home = (props: HomeProps) => {
  return (
    <div className="home container text-center">
      <img style={{ width: "50%" }} src={logo} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};

export default connect(
  mapStateToProps,
  { toggleSidebar }
)(Home);
