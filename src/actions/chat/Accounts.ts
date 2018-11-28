import {
  SLEK_ACCOUNT_GETTING_STARTED,
  SLEK_ACCOUNT_GETTING_FAILED,
  SLEK_ACCOUNT_GETTING_SUCCEEDED,
  SLEK_ACCOUNTS_GETTING_STARTED,
  SLEK_ACCOUNTS_GETTING_FAILED,
  SLEK_ACCOUNTS_GETTING_SUCCEEDED,
} from '../../constants/actions';
import {IAccount} from '../../models/chat/IAccount';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IServices} from '../../services';

const accountGettingStarted = (email: string): Action => ({
  type: SLEK_ACCOUNT_GETTING_STARTED,
  payload: email
});

const accountGettingSucceeded = (account: IAccount): Action => ({
  type: SLEK_ACCOUNT_GETTING_SUCCEEDED,
  payload: account
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
      dispatch(accountGettingSucceeded(account));
    } catch (e) {
      dispatch(accountGettingFailed(email));
    }
  };

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
