import {
  SLEK_LOGIN_FAILURE,
  SLEK_LOGIN_SUCCESS,
  SLEK_LOGIN, SLEK_LOGOUT_SUCCESS, SLEK_LOGOUT_FAILURE, SLEK_LOGOUT
} from '../../constants/actions';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import * as api from '../../api/api';
import {ILoginOwnProps} from '../../components/chat/Login';
import {IAuthData} from '../../models/chat/IAuthData';


const loginSuccess = (auth: IAuthData): Action => ({
  type: SLEK_LOGIN_SUCCESS,
  payload: {
    token: auth.token,
    expiration: auth.expiration
  }
});

const loginFailure = (): Action => ({
  type: SLEK_LOGIN_FAILURE,
  payload: {}
});

export const login = (loginData: ILoginOwnProps): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  try {
    dispatch({
      type: SLEK_LOGIN,
      payload: {
        loginData
      }
    });
    const auth = await api.login(loginData);
    dispatch(loginSuccess(auth));
  } catch (e) {
    dispatch(loginFailure());
  }
};

const logoutSuccess = (): Action => ({
  type: SLEK_LOGOUT_SUCCESS,
  payload: {
    token: ''
  }
});

const logoutFailure = (token: string): Action => ({
  type: SLEK_LOGOUT_FAILURE,
  payload: {
    token,
  }
});

export const logout = (token: string): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  try {
    dispatch({
      type: SLEK_LOGOUT,
      payload: {}
    });
    dispatch(logoutSuccess());
  } catch (e) {
    dispatch(logoutFailure(token));
  }
};
