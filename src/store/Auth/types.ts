import { ThunkAction } from 'redux-thunk';


export enum AuthActionTypes {
  FETCH_AUTH = 'FETCH_AUTH',
  FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS',
  FETCH_AUTH_FAIL = 'FETCH_AUTH_FAIL',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}