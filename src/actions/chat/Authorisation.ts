import {
  SLEK_LOGIN_FAILURE,
  SLEK_LOGIN_SUCCESS,
  SLEK_LOGIN, SLEK_LOGOUT_SUCCESS, SLEK_LOGOUT_FAILURE, SLEK_LOGOUT
} from '../../constants/actions';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import * as api from '../../api/api';
import {IAuthData} from '../../models/chat/IAuthData';
import {push} from 'connected-react-router';


const loginSuccess = (email: string, auth: IAuthData): Action => ({
  type: SLEK_LOGIN_SUCCESS,
  payload: {
    email,
    token: auth.token,
    expiration: auth.expiration
  }
});

const loginFailure = (email: string): Action => ({
  type: SLEK_LOGIN_FAILURE,
  payload: {email}
});

export const login = (email: string, password: string): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  try {
    dispatch({
      type: SLEK_LOGIN,
      payload: {
        email
      }
    });
    const auth = await api.login(email, password);
    dispatch(loginSuccess(email, auth));
    dispatch(push('/'));
  } catch (e) {
    dispatch(loginFailure(email));
  }
};

const logoutSuccess = (): Action => ({
  type: SLEK_LOGOUT_SUCCESS,
  payload: {
    token: ''
  }
});

const logoutFailure = (): Action => ({
  type: SLEK_LOGOUT_FAILURE,
  payload: {}
});

export const logout = (): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  try {
    dispatch({
      type: SLEK_LOGOUT,
      payload: {}
    });
    dispatch(logoutSuccess());
    dispatch(push('/login'));
  } catch (e) {
    dispatch(logoutFailure());
  }
};
