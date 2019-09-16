import React from "react";
import { connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import _ from "lodash";
import { History } from "history";
import Routes from "../../routes";
import { authCheckState } from "../../store/Auth/actions";
import { RootState } from "../../store/rootReducer";
import "./App.scss";

interface AppProps {
  history: History;
  isAuthenticated: boolean;
  loading: boolean;
  authCheckState: () => void;
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    const { history, isAuthenticated, loading } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div className="theme-light ltr-support" dir="ltr">
          <div className="wrapper">
            <Routes loading={loading} isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: _.get(state, "auth.token", []),
    loading: _.get(state, "auth.loading", null)
  };
};

export default connect(
  mapStateToProps,
  { authCheckState }
)(App);
