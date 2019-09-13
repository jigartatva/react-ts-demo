import React from "react";
import { ConnectedRouter } from "connected-react-router";

import logo from "../../assets/logo.svg";
import "./App.scss";
import { History } from "history";
import routes from "../../routes";

interface AppProps {
  history: History;
}

const App = ({ history }: AppProps) => {
  return (
    <ConnectedRouter history={history}>
      <div className="theme-light ltr-support" dir="ltr">
        <div className="wrapper">{routes}</div>
      </div>
    </ConnectedRouter>
  );
};

export default App;
