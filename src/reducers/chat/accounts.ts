import * as Immutable from 'immutable';
import {IAccountsState} from '../../states/chat/IAccountsState';
import {IAccount} from '../../models/chat/IAccount';
import {ILoadable} from '../../states/common/ILoadable';

export const accounts = (state: IAccountsState = {
                           isLoading: false,
                           error: null,
                           active: null,
                           content: Immutable.Map<Uuid, ILoadable<IAccount>>()
                         },
                         action: Action): IAccountsState => {
  switch (action.type) {
    default:
      return state;
  }
};

