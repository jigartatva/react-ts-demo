import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import {createRootReducer, RootState, RootActions} from './rootReducer';

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [reduxThunk as ThunkMiddleware<RootState, RootActions>, routerMiddleware(history)];

export default function configureStore(preloadedState?: any) {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(applyMiddleware(...middleware))
  );

  return store;
}
