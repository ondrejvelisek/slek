import * as Immutable from 'immutable';
import {IAccountsState} from '../../states/chat/IAccountsState';
import {IAccount} from '../../models/chat/IAccount';
import {
  SLEK_ACCOUNT_AUTHORIZATION_FAILED,
  SLEK_ACCOUNT_GETTING_FAILED,
  SLEK_ACCOUNT_GETTING_STARTED,
  SLEK_ACCOUNT_GETTING_SUCCEEDED,
  SLEK_ACCOUNTS_GETTING_FAILED,
  SLEK_ACCOUNTS_GETTING_STARTED,
  SLEK_ACCOUNTS_GETTING_SUCCEEDED, SLEK_AVATAR_UPDATE_STARTED, SLEK_AVATAR_UPDATE_SUCCEEDED
} from '../../constants/actions';

export const accounts = (state: IAccountsState = {
                           isLoading: false,
                           error: null,
                           content: Immutable.Map<string, IAccount>()
                         },
                         action: Action): IAccountsState => {
  switch (action.type) {
    case SLEK_ACCOUNT_GETTING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_ACCOUNT_GETTING_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: null,
        content: state.content.set(action.payload.email, action.payload.account)
      };
    case SLEK_ACCOUNT_GETTING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case SLEK_AVATAR_UPDATE_STARTED:
      return {
        ...state,
        content: state.content.update(action.payload.email, (acc) => ({
            ...acc,
            avatar: action.payload.tempUrl
        }))
      };
    case SLEK_AVATAR_UPDATE_SUCCEEDED:
      return {
        ...state,
        content: state.content.set(action.payload.account.email, action.payload.account)
      };
    case SLEK_ACCOUNT_GETTING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case SLEK_ACCOUNT_AUTHORIZATION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case SLEK_ACCOUNTS_GETTING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_ACCOUNTS_GETTING_SUCCEEDED:
      const accountsMap = Immutable.Map<string, IAccount>(action.payload.map(
        (acc: IAccount) => [acc.email, acc]
      ));
      return {
        ...state,
        isLoading: false,
        error: null,
        content: state.content.merge(accountsMap)
      };
    case SLEK_ACCOUNTS_GETTING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

