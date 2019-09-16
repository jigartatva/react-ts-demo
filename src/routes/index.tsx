import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import NotFound404 from "../containers/404";
import Home from "../containers/Home";
import Login from "../containers/LogIn";
import Users from "../containers/Admin/Users";
import Users2 from "../containers/Admin/Users2";
import Layout from "../components/Layout";

interface RouteProps {
  isAuthenticated: boolean;
  loading: boolean;
}

const Routes = (props: RouteProps) => {
  const { isAuthenticated, loading } = props;
  let routes = null;

  if (!isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    );
  }
  if (isAuthenticated) {
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
  return <HashRouter>{routes}</HashRouter>;
};

export default Routes;
