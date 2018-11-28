import * as Immutable from 'immutable';
import {IAccountsState} from '../../states/chat/IAccountsState';
import {IAccount} from '../../models/chat/IAccount';
import {ILoadable} from '../../states/common/ILoadable';
import {SLEK_ACCOUNT_GETTING_FAILED, SLEK_ACCOUNT_GETTING_STARTED, SLEK_ACCOUNT_GETTING_SUCCEEDED, SLEK_ACCOUNTS_GETTING_FAILED, SLEK_ACCOUNTS_GETTING_STARTED, SLEK_ACCOUNTS_GETTING_SUCCEEDED} from '../../constants/actions';

export const accounts = (state: IAccountsState = {
                           isLoading: false,
                           error: null,
                           content: Immutable.Map<string, ILoadable<IAccount>>()
                         },
                         action: Action): IAccountsState => {
  switch (action.type) {
    case SLEK_ACCOUNT_GETTING_STARTED:
      return {
        ...state,
        content: state.content.set(action.payload, {
          ...state.content.get(action.payload),
          isLoading: true,
          error: null
        })
      };
    case SLEK_ACCOUNT_GETTING_SUCCEEDED:
      return {
        ...state,
        content: state.content.set(action.payload.email, {
          content: action.payload,
          isLoading: false,
          error: null
        })
      };
    case SLEK_ACCOUNT_GETTING_FAILED:
      return {
        ...state,
        content: state.content.set(action.payload, {
          ...state.content.get(action.payload),
          isLoading: false,
          error: true
        })
      };
    case SLEK_ACCOUNTS_GETTING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_ACCOUNTS_GETTING_SUCCEEDED:
      const accountsMap = Immutable.Map<string, ILoadable<IAccount>>(action.payload.map(
        (acc: IAccount) => [acc.email, {isLoading: false, error: null, content: acc}]
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

