import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import _ from 'lodash';
import { RootState, RootActions } from '../../store/rootReducer';
import { User } from '../../models/users';
import { AxiosResponse } from 'axios';
import { AuthActionTypes } from './types';
import { fetchAuthService } from '../../services/auth';
import { fetchUserService } from '../../services/users';
import { notification } from 'antd';
const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message 
  });
};

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
// FETCH AUTH

interface FetchAuth {
  type: AuthActionTypes.FETCH_AUTH;
}

interface FetchAuthSuccess {
  type: AuthActionTypes.FETCH_AUTH_SUCCESS;
  payload: User;
  token: string;
}

interface FetchAuthFail {
  type: AuthActionTypes.FETCH_AUTH_FAIL;
}

interface Credential {
  email: string;
  password: string;
}


export const authLogout = (): ThunkResult<void> => async dispatch => {

    logout(dispatch);

};

export const fetchAuth = (credentials: Credential): ThunkResult<void> => async dispatch => {
  handleFetchAuth(dispatch);
  try {
    const response: AxiosResponse<User[]> = await fetchAuthService(credentials);

    if (!_.isEmpty(response.data)) {
      const expiresIn = _.get(response.data, 'expiresIn', 10000);
      const token = _.get(response.data, 'token', Math.floor(100000000 + Math.random() * 900000000));
      const userData = response.data[0];
      const userId = _.get(userData, 'id', null);

      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate.toString());
      localStorage.setItem('userId', userId);
      handleFetchAuthSuccess(dispatch, userData, token);
      dispatch(checkAuthTimeout(expiresIn));
    } else {
      openNotificationWithIcon('error', 'Invalid username or password');
      handleFetchAuthFail(dispatch);
    }


  } catch (e) {
    handleFetchAuthFail(dispatch);
  }
};

export const handleFetchAuth = (dispatch: Dispatch<FetchAuth>) => {
  dispatch({ type: AuthActionTypes.FETCH_AUTH });
};

export const handleFetchAuthSuccess = (
  dispatch: Dispatch<FetchAuthSuccess>,
  response: User,
  token: string,
) => {
  dispatch({
    type: AuthActionTypes.FETCH_AUTH_SUCCESS,
    payload: response,
    token
  });
};

export const handleFetchAuthFail = (dispatch: Dispatch<FetchAuthFail>) => {
  dispatch({
    type: AuthActionTypes.FETCH_AUTH_FAIL
  });
};

interface AuthLogout {
  type: AuthActionTypes.AUTH_LOGOUT;
}
export const logout = async (dispatch: Dispatch<AuthLogout>) => {
  await localStorage.removeItem('token');
  await localStorage.removeItem('expirationDate');
  await localStorage.removeItem('userId');
  dispatch({
    type: AuthActionTypes.AUTH_LOGOUT
  });
};

export const checkAuthTimeout = (expirationTime): ThunkResult<void> => async dispatch => {

  setTimeout(() => {

    logout(dispatch);
  }, expirationTime * 1000);

};

export const authCheckState = (): ThunkResult<void> => async dispatch => {
  handleFetchAuth(dispatch);
  const token = localStorage.getItem('token');
  if (!token) {
    logout(dispatch);
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      logout(dispatch);
    } else {
      const userId = parseInt(localStorage.getItem('userId'));
      const response: AxiosResponse<User> = await fetchUserService(userId);
      handleFetchAuthSuccess(dispatch, response.data, token);
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }

};

export type AuthAction =
  | FetchAuth
  | FetchAuthSuccess
  | FetchAuthFail
  | AuthLogout


