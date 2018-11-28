import {
  SLEK_ACCOUNT_GETTING_STARTED,
  SLEK_ACCOUNT_GETTING_FAILED,
  SLEK_ACCOUNT_GETTING_SUCCEEDED,
  SLEK_ACCOUNTS_GETTING_STARTED,
  SLEK_ACCOUNTS_GETTING_FAILED,
  SLEK_ACCOUNTS_GETTING_SUCCEEDED, SLEK_ACCOUNT_AUTHORIZATION_FAILED,
} from '../../constants/actions';
import {IAccount} from '../../models/chat/IAccount';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IServices} from '../../services';
import {HttpError} from '../../services/fetchDecorators';
// import {HttpError} from '../../services/fetchDecorators';

const accountGettingStarted = (email: string): Action => ({
  type: SLEK_ACCOUNT_GETTING_STARTED,
  payload: email
});

const accountGettingSucceeded = (email: string, account: IAccount|null): Action => ({
  type: SLEK_ACCOUNT_GETTING_SUCCEEDED,
  payload: {
    email,
    account
  }
});

const accountGettingFailed = (email: string): Action => ({
  type: SLEK_ACCOUNT_GETTING_FAILED,
  payload: email
});

export const getAccount = (email: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(accountGettingStarted(email));
      const account = await chatService.getUser(email);
      dispatch(accountGettingSucceeded(email, account));
    } catch (e) {
      dispatch(accountGettingFailed(email));
    }
  };

const authorizationFailed = (email: string): Action => ({
  type: SLEK_ACCOUNT_AUTHORIZATION_FAILED,
  payload: email
});

export const authorizeAccount = (email: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(accountGettingStarted(email));
      const account = await chatService.getUser(email);
      dispatch(accountGettingSucceeded(email, account));
    } catch (e) {
      if (e instanceof HttpError && e.code === 404) {
        dispatch(authorizationFailed(email));
      } else {
        dispatch(accountGettingFailed(email));
      }
    }
  };

// export const getActiveAccount = (): ThunkAction<void, IRootState, IServices, Action> =>
//   async (dispatch, getState, {chatService}) => {
//     const auth = getState().chat.auth.content;
//     if (!auth) {
//       // TODO should dispatch something
//       return;
//     }
//     try {
//       dispatch(accountGettingStarted(auth.email));
//       const account = await chatService.getUser(auth.email);
//       dispatch(accountGettingSucceeded(auth.email, account));
//     } catch (e) {
//       if (e instanceof HttpError) {
//         if (e.code === 404) {
//           dispatch(accountGettingSucceeded(auth.email, null));
//         }
//       } else {
//         dispatch(accountGettingFailed(auth.email));
//       }
//     }
//   };

const accountsGettingStarted = (): Action => ({
  type: SLEK_ACCOUNTS_GETTING_STARTED,
});

const accountsGettingSucceeded = (accounts: Immutable.List<IAccount>): Action => ({
  type: SLEK_ACCOUNTS_GETTING_SUCCEEDED,
  payload: accounts
});

const accountsGettingFailed = (): Action => ({
  type: SLEK_ACCOUNTS_GETTING_FAILED
});

export const getAccounts = (): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(accountsGettingStarted());
      const accounts = await chatService.getUsers();
      dispatch(accountsGettingSucceeded(accounts));
    } catch (e) {
      dispatch(accountsGettingFailed());
    }
  };
