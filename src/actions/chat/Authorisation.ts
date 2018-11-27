import {
  SLEK_LOGIN_FAILED,
  SLEK_LOGIN_SUCCEEDED,
  SLEK_LOGIN_STARTED, SLEK_LOGOUT_SUCCEEDED, SLEK_LOGOUT_FAILED, SLEK_LOGOUT_STARTED
} from '../../constants/actions';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {push} from 'connected-react-router';
import {IServices} from '../../services';
import {ICredentials} from '../../models/chat/ICredentials';

const loginStarted = (email: string): Action => ({
  type: SLEK_LOGIN_STARTED,
  payload: {
    email
  }
});

const loginSucceeded = (email: string): Action => ({
  type: SLEK_LOGIN_SUCCEEDED,
  payload: {
    email
  }
});

const loginFailed = (email: string): Action => ({
  type: SLEK_LOGIN_FAILED,
  payload: {email}
});

export const login = (credentials: ICredentials): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {authService}) => {
  try {
    console.log('LOGIN ACTION', credentials);
    dispatch(loginStarted(credentials.email));
    await authService.login(credentials);
    dispatch(loginSucceeded(credentials.email));
    dispatch(push('/'));
  } catch (e) {
    dispatch(loginFailed(credentials.email));
  }
};

const logoutStarted = (): Action => ({
  type: SLEK_LOGOUT_STARTED
});

const logoutSucceeded = (): Action => ({
  type: SLEK_LOGOUT_SUCCEEDED
});

const logoutFailed = (): Action => ({
  type: SLEK_LOGOUT_FAILED
});

export const logout = (): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {authService}) => {
  try {
    dispatch(logoutStarted());
    await authService.logout();
    dispatch(logoutSucceeded());
    dispatch(push('/login'));
  } catch (e) {
    dispatch(logoutFailed());
  }
};
