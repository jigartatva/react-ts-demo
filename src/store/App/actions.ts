import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { AppActionTypes } from "./types";

interface ToggleSideBar {
  type: AppActionTypes.TOGGLE_SIDEBAR;
}

export const toggleSidebar = () => (dispatch: Dispatch<ToggleSideBar>) => {
  dispatch({ type: AppActionTypes.TOGGLE_SIDEBAR });
};

export type AppAction = ToggleSideBar;
