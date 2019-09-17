import _ from "lodash";
import { AuthAction } from "./actions";
import { AuthActionTypes } from "./types";
import { Reducer } from "redux";
import { User } from "../../models/users";

export interface AuthState {
  user: User;
  token: string;
  loading: boolean;
  loadingUserData: boolean;
  error: String | null;
}

const initialState = {
  user: null,
  token: null,
  loading: null,
  loadingUserData: null,
  error: null
};

export const authReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.FETCH_AUTH:
      return { ...state, loading: true };
    case AuthActionTypes.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingUserData: false,
        token: action.token,
        user: action.payload
      };
    case AuthActionTypes.FETCH_AUTH_FAIL:
      return { ...state, loading: false, loadingUserData: false };
    case AuthActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        loading: false,
        error: null,
        loadingUserData: false
      };
    case AuthActionTypes.FETCH_AUTH_CHECK:
      return { ...state, loadingUserData: true, error: null };

    default:
      return state;
  }
};
