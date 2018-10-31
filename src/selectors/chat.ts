import { createSelector } from 'reselect';
import {IRootState} from '../states/IRootState';
import {IAccountsState} from '../states/chat/IAccountsState';
import {IAccount} from '../models/chat/IAccount';
import {IChannelsState} from '../states/chat/IChannelsState';
import {IMessagesState} from '../states/chat/IMessagesState';
import {IChannel} from '../models/chat/IChannel';
import {ILoadable} from '../states/common/ILoadable';
import {IHasId} from '../models/chat/IHasId';
import * as Immutable from 'immutable';

const selectAccounts = (state: IRootState): IAccountsState => state.chat.accounts;
const selectChannels = (state: IRootState): IChannelsState => state.chat.channels;
const selectMessages = (state: IRootState): IMessagesState => state.chat.messages;

export const selectActiveAccount = createSelector<IRootState, IAccountsState, ILoadable<(IAccount & IHasId) | null>>(
  [selectAccounts],
  accounts => {
    if (accounts.active && accounts.content.get(accounts.active)) {
      const account = accounts.content.get(accounts.active);
      return {
        isLoading: account.isLoading,
        error: account.error,
        content: {
          ...account.content,
          id: accounts.active
        }
      };
    } else {
      return {
        isLoading: accounts.isLoading,
        error: accounts.error,
        content: null
      };
    }
  }
);

export const selectMessagesKeys = createSelector<IRootState, IMessagesState, Immutable.List<Uuid>>(
  [selectMessages],
  messages => Immutable.List(messages.content.keySeq())
);

export const selectChannelsKeys = createSelector<IRootState, IChannelsState, Immutable.List<Uuid>>(
  [selectChannels],
  channels => Immutable.List(channels.content.keySeq())
);

export const selectActiveChannel = createSelector<IRootState, IChannelsState, IChannel | null>(
  [selectChannels],
  channels => channels.active ? channels.content.get(channels.active) : null
);
