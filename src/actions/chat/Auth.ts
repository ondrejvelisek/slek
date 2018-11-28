import {
  SLEK_LOGIN_FAILED,
  SLEK_LOGIN_SUCCEEDED,
  SLEK_LOGIN_STARTED,
  SLEK_LOGOUT
} from '../../constants/actions';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {push} from 'connected-react-router';
import {IServices} from '../../services';
import {ICredentials} from '../../models/chat/ICredentials';
import {IAuth} from '../../models/chat/IAuth';

const loginStarted = (email: string): Action => ({
  type: SLEK_LOGIN_STARTED,
  payload: email
});

const loginSucceeded = (auth: IAuth): Action => ({
  type: SLEK_LOGIN_SUCCEEDED,
  payload: auth
});

const loginFailed = (email: string): Action => ({
  type: SLEK_LOGIN_FAILED,
  payload: email
});

export const login = (credentials: ICredentials): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
  try {
    dispatch(loginStarted(credentials.email));
    const authData = await chatService.login(credentials);
    dispatch(loginSucceeded({...authData, email: credentials.email}));
    dispatch(push('/'));
  } catch (e) {
    dispatch(loginFailed(credentials.email));
  }
};

export const logout = (): Action => ({
  type: SLEK_LOGOUT
});
