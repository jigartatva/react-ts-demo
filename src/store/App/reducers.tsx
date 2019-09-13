import { AppState, AppActionTypes, TOGGLE_SIDEBAR } from "./types";

const initialState: AppState = {
  showSidebar: true
};

export function appReducer(
  state = initialState,
  action: AppActionTypes
): AppState {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar
      };
    default:
      return state;
  }
}
