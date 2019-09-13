// Constants definitions
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

// State of Application
export interface AppState {
  showSidebar: boolean;
}

// Action Type
interface ToggleSidebarAction {
  type: typeof TOGGLE_SIDEBAR;
}

// Bulk Exported action types. Add new actions by adding "| <new action>"
export type AppActionTypes = ToggleSidebarAction;
