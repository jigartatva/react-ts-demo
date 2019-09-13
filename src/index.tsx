import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import configureStore, { history } from "./store";
import "./translations/i18n";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/app.scss";

const store = configureStore();

render(
  <div className={"app"}>
    <Provider store={store}>
      <App history={history} />
    </Provider>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
