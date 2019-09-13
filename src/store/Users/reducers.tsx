import _ from 'lodash';
import { UsersAction } from './actions';
import { UsersActionTypes } from './types';
import { Reducer } from 'redux';
import { User } from '../../models/users';


export interface UsersState {
  userList: User[];
  editUserData: User | null,
  loading: boolean;
  error: String | null,
}

const initialState = {
  userList: [],
  loading: false,
  error: null,
  editUserData: null
};

export const usersReducer: Reducer<UsersState, UsersAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USER:
        return { ...state, loading: false };
    case UsersActionTypes.FETCH_USERS:
    case UsersActionTypes.ADD_USER:
    case UsersActionTypes.EDIT_USER:
      return { ...state, loading: true };

    case UsersActionTypes.FETCH_USER_FAIL:
    case UsersActionTypes.FETCH_USERS_FAIL:
    case UsersActionTypes.ADD_USER_FAIL:
      return { ...state, loading: false };

    case UsersActionTypes.FETCH_USER_SUCCESS:

      return {
        ...state,
        editUserData: action.payload,
        loading: false
      };
    case UsersActionTypes.EDIT_USER_SUCCESS:  
    case UsersActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        editUserData: null,
      };

    case UsersActionTypes.FETCH_USERS_SUCCESS:

      return {
        ...state,
        userList: action.payload.reverse(),
        loading: false
      };

    case UsersActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        userList: { ..._.omit(state.userList, action.payload) }
      };

    default:
      return state;
  }
};
