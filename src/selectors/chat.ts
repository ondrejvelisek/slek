import { createSelector } from 'reselect';
import {IRootState} from '../states/IRootState';
import {IAccountsState} from '../states/chat/IAccountsState';
import {IAccount} from '../models/chat/IAccount';
import {IChannelsState} from '../states/chat/IChannelsState';
// import {IMessagesState} from '../states/chat/IMessagesState';
import {IChannel} from '../models/chat/IChannel';
import {ILoadable} from '../states/common/ILoadable';
import * as Immutable from 'immutable';
import {IMessage} from '../models/chat/IMessage';

const selectAccounts = (state: IRootState): IAccountsState => state.chat.accounts;
const selectChannels = (state: IRootState): IChannelsState => state.chat.channels;
const selectChannelsMap = (state: IRootState): Immutable.Map<Uuid, ILoadable<IChannel>> => state.chat.channels.content;
// const selectMessages = (state: IRootState): IMessagesState => state.chat.messages;
const selectMessagesMap = (state: IRootState): Immutable.Map<Uuid, IMessage> => state.chat.messages.content;

export const selectMessagesKeys = createSelector<IRootState, Immutable.Map<Uuid, IMessage>, Immutable.List<Uuid>>(
  [selectMessagesMap],
  messages => Immutable.List(messages.keySeq())
);

export const selectChannelsKeys = createSelector<IRootState, Immutable.Map<Uuid, ILoadable<IChannel>>, Immutable.List<Uuid>>(
  [selectChannelsMap],
  channels => Immutable.List(channels.keySeq())
);

export const selectActiveAccount = createSelector<IRootState, IAccountsState, ILoadable<IAccount|null>>(
  [selectAccounts],
  accounts => ({
    isLoading: accounts.active ? accounts.content.get(accounts.active).isLoading : accounts.isLoading,
    error: accounts.active ? accounts.content.get(accounts.active).error : accounts.error,
    content: accounts.active ? accounts.content.get(accounts.active).content : null
  })
);

export const selectActiveChannel = createSelector<IRootState, IChannelsState, ILoadable<IChannel|null>>(
  [selectChannels],
  channels => ({
    isLoading: channels.active ? channels.content.get(channels.active).isLoading : channels.isLoading,
    error: channels.active ? channels.content.get(channels.active).error : channels.error,
    content: channels.active ? channels.content.get(channels.active).content : null
  })
);
