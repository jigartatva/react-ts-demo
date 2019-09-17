import React from "react";
import { Spin, Icon } from "antd";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "../containers/Home";
import Login from "../containers/LogIn";
import Users from "../containers/Admin/Users";
import Users2 from "../containers/Admin/Users2";
import Layout from "../components/Layout";

interface RouteProps {
  isAuthenticated: boolean;
  loadingUserData: boolean;
}

const Routes = (props: RouteProps) => {
  const { isAuthenticated, loadingUserData } = props;
  let routes = null;
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  //public routes
  if (!isAuthenticated && !loadingUserData) {
    routes = (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    );
  } else if (loadingUserData) {
    routes = (
      <div className="screen-loader">
        <Spin indicator={antIcon} />
      </div>
    );
  } else {
    //private routes
    routes = (
      <Layout>
        <div className="container__wrap">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Home} />
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/admin/users-2" component={Users2} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Layout>
    );
  }
  return (
    <HashRouter>
      <>{routes}</>
    </HashRouter>
  );
};

export default Routes;
