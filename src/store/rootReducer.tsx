import { combineReducers } from 'redux';
import { History } from 'history';
import { RouterState, connectRouter } from 'connected-react-router';
import { appReducer } from './App/reducers';
import { AppState } from './App/types';
import { usersReducer, UsersState } from './Users/reducers';
import { UsersAction } from './Users/actions';

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
    users: usersReducer
  });

export interface RootState {
  router: RouterState;
  app: AppState;
  users: UsersState;
}
export type RootActions = UsersAction; // | CommentsAction | etc.

