import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import NotFound404 from "../containers/404";
import Home from "../containers/Home";
import Login from "../containers/LogIn";

const routes = (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/admin" component={Home} />
      <Route path="/" component={NotFound404} />
    </Switch>
  </HashRouter>
);

export default routes;
