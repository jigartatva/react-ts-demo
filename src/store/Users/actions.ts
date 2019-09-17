import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../../store/rootReducer';
import { User } from '../../models/users';
import { AxiosResponse } from 'axios';
import { UsersActionTypes } from './types';
import { fetchUsersService, fetchUserService, addUserService, editUserService, deleteUserService } from '../../services/users';

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

//interface for user actions
interface FetchUsers {
  type: UsersActionTypes.FETCH_USERS;
}

interface FetchUsersSuccess {
  type: UsersActionTypes.FETCH_USERS_SUCCESS;
  payload: User[];
}

interface FetchUsersFail {
  type: UsersActionTypes.FETCH_USERS_FAIL;
}

export const fetchUsers = (): ThunkResult<void> => async dispatch => {
  handleFetchUsers(dispatch);
  try {
    const response: AxiosResponse<User[]> = await fetchUsersService();
    handleFetchUsersSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchUsersFail(dispatch);
  }
};

export const handleFetchUsers = (dispatch: Dispatch<FetchUsers>) => {
  dispatch({ type: UsersActionTypes.FETCH_USERS });
};

export const handleFetchUsersSuccess = (
  dispatch: Dispatch<FetchUsersSuccess>,
  response: User[]
) => {
  dispatch({
    type: UsersActionTypes.FETCH_USERS_SUCCESS,
    payload: response
  });
};

export const handleFetchUsersFail = (dispatch: Dispatch<FetchUsersFail>) => {
  dispatch({
    type: UsersActionTypes.FETCH_USERS_FAIL
  });
};

// FETCH USER

interface FetchUser {
  type: UsersActionTypes.FETCH_USER;
}

interface FetchUserSuccess {
  type: UsersActionTypes.FETCH_USER_SUCCESS;
  payload: User;
}

interface FetchUserFail {
  type: UsersActionTypes.FETCH_USER_FAIL;
}

export const fetchUser = (id: number): ThunkResult<void> => async dispatch => {
  handleFetchUser(dispatch);
  try {
    const response: AxiosResponse<User> = await fetchUserService(id);
    handleFetchUserSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchUserFail(dispatch);
  }
};

export const handleFetchUser = (dispatch: Dispatch<FetchUser>) => {
  dispatch({ type: UsersActionTypes.FETCH_USER });
};

const handleFetchUserSuccess = (
  dispatch: Dispatch<FetchUserSuccess>,
  response: User
) => {
  dispatch({
    type: UsersActionTypes.FETCH_USER_SUCCESS,
    payload: response
  });
};

const handleFetchUserFail = (dispatch: Dispatch<FetchUserFail>) => {
  dispatch({
    type: UsersActionTypes.FETCH_USER_FAIL
  });
};

// ADD USER

interface AddUser {
  type: UsersActionTypes.ADD_USER;
}

interface AddUserSuccess {
  type: UsersActionTypes.ADD_USER_SUCCESS;
  payload: User;
}

interface AddUserFail {
  type: UsersActionTypes.ADD_USER_FAIL;
}

export const addUser = (user: User): ThunkResult<void> => async dispatch => {
  handleAddUser(dispatch);
  try {
    const response: AxiosResponse<User> = await addUserService(user);
    handleAddUserSuccess(dispatch, response.data);
    dispatch(fetchUsers());
  } catch (e) {
    handleAddUserFail(dispatch);
  }
};

const handleAddUser = (dispatch: Dispatch<AddUser>) => {
  dispatch({ type: UsersActionTypes.ADD_USER });
};

const handleAddUserSuccess = (
  dispatch: Dispatch<AddUserSuccess>,
  response: User
) => {
  dispatch({ type: UsersActionTypes.ADD_USER_SUCCESS, payload: response });
 
};

const handleAddUserFail = (dispatch: Dispatch<AddUserFail>) => {
  dispatch({ type: UsersActionTypes.ADD_USER_FAIL });
};

// EDIT USER

interface EditUser {
  type: UsersActionTypes.EDIT_USER;
}

interface EditUserSuccess {
  type: UsersActionTypes.EDIT_USER_SUCCESS;
  payload: User;
}

interface EditUserFail {
  type: UsersActionTypes.EDIT_USER_FAIL;
}

interface ResetEditData {
  type: UsersActionTypes.RESET_EDIT_DATA;
}

export const editUser = (
  editedUser: User
): ThunkResult<void> => async dispatch => {
  handleEditUser(dispatch);
  try {
    const response: AxiosResponse<User> =  await editUserService(editedUser);
    handleEditUserSuccess(dispatch, response.data);
    dispatch(fetchUsers());
  } catch (e) {
    handleEditUserFail(dispatch);
  }
};

const handleEditUser = (dispatch: Dispatch<EditUser>): void => {
  dispatch({ type: UsersActionTypes.EDIT_USER });
};

const handleEditUserSuccess = (
  dispatch: Dispatch<EditUserSuccess>,
  editedUser: User
) => {
  dispatch({ type: UsersActionTypes.EDIT_USER_SUCCESS, payload: editedUser });
 
};

const handleEditUserFail = (dispatch: Dispatch<EditUserFail>) => {
  dispatch({ type: UsersActionTypes.EDIT_USER_FAIL });
};

export const resetEditData = (): ThunkResult<void> => dispatch => {
  dispatch({ type: UsersActionTypes.RESET_EDIT_DATA });
};
// DELETE USER

interface DeleteUser {
  type: UsersActionTypes.DELETE_USER;
}

interface DeleteUserSuccess {
  type: UsersActionTypes.DELETE_USER_SUCCESS;
  payload: number;
}

interface DeleteUserFail {
  type: UsersActionTypes.DELETE_USER_FAIL;
}

export const deleteUser = (
  deletedId: number
): ThunkResult<void> => async dispatch => {
  dispatch({ type: UsersActionTypes.DELETE_USER });
  try {
    await deleteUserService(deletedId);
    dispatch({
      type: UsersActionTypes.DELETE_USER_SUCCESS,
      payload: deletedId
    });
    dispatch(fetchUsers());
    
  } catch (e) {
    dispatch({ type: UsersActionTypes.DELETE_USER_FAIL });
  }
};

export type UsersAction =
  | FetchUsers
  | FetchUsersSuccess
  | FetchUsersFail
  | FetchUser
  | FetchUserSuccess
  | FetchUserFail
  | AddUser
  | AddUserSuccess
  | AddUserFail
  | EditUser
  | EditUserSuccess
  | EditUserFail
  | ResetEditData
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail;
