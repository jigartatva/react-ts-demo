import { combineReducers } from "redux";
import { History } from "history";
import { RouterState, connectRouter } from "connected-react-router";
import { appReducer, AppState } from "./App/reducers";
import { AppAction } from "./App/actions";
import { authReducer, AuthState } from "./Auth/reducers";
import { AuthAction } from "./Auth/actions";
import { usersReducer, UsersState } from "./Users/reducers";
import { UsersAction } from "./Users/actions";

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
    auth: authReducer,
    users: usersReducer
  });

export interface RootState {
  router: RouterState;
  app: AppState;
  users: UsersState;
  auth: AuthState;
}
export type RootActions = AppAction | AuthAction | UsersAction; // | etc.
