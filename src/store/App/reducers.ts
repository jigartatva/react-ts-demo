import _ from "lodash";
import { AppAction } from "./actions";
import { AppActionTypes } from "./types";
import { Reducer } from "redux";

export interface AppState {
  showSidebar: boolean;
}

const initialState = {
  showSidebar: false
};

export const appReducer: Reducer<AppState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AppActionTypes.TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    default:
      return state;
  }
};
