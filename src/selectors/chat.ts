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
import {IAuthState} from '../states/chat/IAuthState';

const selectAccounts = (state: IRootState): IAccountsState => state.chat.accounts;
const selectChannels = (state: IRootState): IChannelsState => state.chat.channels;
const selectActiveChannelId = (state: IRootState): Uuid|null => state.chat.channels.active;
const selectAuth = (state: IRootState): IAuthState => state.chat.auth;
const selectChannelsMap = (state: IRootState): Immutable.Map<Uuid, ILoadable<IChannel>> => state.chat.channels.content;
// const selectMessages = (state: IRootState): IMessagesState => state.chat.messages;
const selectMessagesMap = (state: IRootState): Immutable.Map<Uuid, IMessage> => state.chat.messages.content;


export const selectActAccount = createSelector<IRootState, Immutable.Map<Uuid, IMessage>, Uuid|null, Immutable.List<Uuid>>(
  [selectMessagesMap, selectActiveChannelId],
  (messages, channelId) => Immutable.List(messages.filter(msg => msg ? msg.channelId === channelId : false).keySeq())
);

export const selectMessageIds = createSelector<IRootState, Immutable.Map<Uuid, IMessage>, Uuid|null, Immutable.List<Uuid>>(
  [selectMessagesMap, selectActiveChannelId],
  (messages, channelId) => Immutable.List(messages.filter(msg => msg ? msg.channelId === channelId : false).keySeq())
);

export const selectChannelIds = createSelector<IRootState, Immutable.Map<Uuid, ILoadable<IChannel>>, Immutable.List<Uuid>>(
  [selectChannelsMap],
  channels => Immutable.List(channels.keySeq())
);

export const selectActiveAccount = createSelector<IRootState, IAuthState, IAccountsState, ILoadable<IAccount|null>>(
  [selectAuth, selectAccounts],
  (auth: IAuthState, accounts: IAccountsState) => {
    if (!auth.content) {
      return {isLoading: false, error: null, content: null};
    }
    const activeEmail = auth.content.email;
    const activeAccount =  accounts.content.get(activeEmail);
    if (!activeAccount) {
      return {isLoading: false, error: null, content: null};
    }
    return activeAccount;
  }
);

export const selectActiveChannel = createSelector<IRootState, IChannelsState, ILoadable<IChannel|null>>(
  [selectChannels],
  channels => ({
    isLoading: channels.active ? channels.content.get(channels.active).isLoading : channels.isLoading,
    error: channels.active ? channels.content.get(channels.active).error : channels.error,
    content: channels.active ? channels.content.get(channels.active).content : null
  })
);
