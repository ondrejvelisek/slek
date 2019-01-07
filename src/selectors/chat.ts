import {createSelector} from 'reselect';
import {IRootState} from '../states/IRootState';
import {IAccountsState} from '../states/chat/IAccountsState';
import {IAccount} from '../models/chat/IAccount';
import {IChannelsState, Order} from '../states/chat/IChannelsState';
import {IChannel} from '../models/chat/IChannel';
import {ILoadable} from '../states/common/ILoadable';
import {List, Map, Set} from 'immutable';
import {IMessage} from '../models/chat/IMessage';
import {IAuthState} from '../states/chat/IAuthState';
import {IEditable} from '../states/common/IEditable';

export const selectAccountsState = (state: IRootState) => state.chat.accounts;
export const selectChannelsState = (state: IRootState) => state.chat.channels;
export const selectMessagesState = (state: IRootState) => state.chat.messages;
export const selectAuthState = (state: IRootState) => state.chat.auth;

export const selectAccountsMap = (state: IRootState) => state.chat.accounts.content;
export const selectChannelsMap = (state: IRootState) => state.chat.channels.content;
export const selectMessagesMap = (state: IRootState) => state.chat.messages.content;
export const selectAuth = (state: IRootState) => state.chat.auth.content;

export const selectActiveChannelId = (state: IRootState) => state.chat.channels.active;
export const selectChannelsOrder = (state: IRootState) => state.chat.channels.order;

export const selectAuthEmail = createSelector(
  [selectAuthState],
  (auth: IAuthState): ILoadable<string|null> => ({
    ...auth,
    content: auth.content ? auth.content.email : null
  })
);

export const selectAuthAccount = createSelector(
  [selectAuthEmail, selectAccountsState],
  (email: ILoadable<string|null>, accounts: IAccountsState): ILoadable<IAccount|null> => {
    if (!email.content) {
      return {
        isLoading: false,
        error: null,
        content: null
      };
    }
    const account = accounts.content.get(email.content);
    return {
      ...accounts,
      content: account
    };
  }
);

export const selectActiveAccountEmail = createSelector(
  [selectAuthEmail],
  (email: ILoadable<string|null>): string => {
    if (!email.content) {
      return '';
    }
    return email.content;
  }
);

export const selectActiveMessageIds = createSelector(
  [selectMessagesMap, selectActiveChannelId],
  (messages: Map<Uuid, IMessage>, channelId: Uuid|null): List<Uuid>|null =>
    channelId ? List(
      messages
        .filter(msg => msg ? msg.channelId === channelId : false)
        .sort((a: IMessage, b: IMessage) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .keySeq()
    ) : null
);

export const selectMessageIds = createSelector(
  [selectMessagesMap],
  (messages: Map<Uuid, IMessage>): List<Uuid> =>
    List(messages.keySeq())
);

export const selectChannelIds = createSelector(
  [selectChannelsMap, selectChannelsOrder],
  (channels: Map<Uuid, ILoadable<IChannel>>, order: Order): List<Uuid> =>
    List(channels.sort(
      (a: ILoadable<IChannel>, b: ILoadable<IChannel>) => (order === Order.Asc ? 1 : -1) * a.content.name.localeCompare(b.content.name)
    ).keySeq())
);

export const selectAccountEmails = createSelector(
  [selectAccountsMap],
  (accounts: Map<string, IAccount>): List<string> =>
    List(accounts.keySeq())
);

export const selectActiveChannel = createSelector<IRootState, IChannelsState, ILoadable<IChannel|null> & IEditable>(
  [selectChannelsState],
  (channels: IChannelsState): ILoadable<IChannel|null> & IEditable => {
    if (!channels.active) {
      return {
        isLoading: channels.isLoading,
        error: channels.error,
        content: null,
        isEditing: false
      };
    }
    const channel = channels.content.get(channels.active);
    return {
      isLoading: channel.isLoading || channels.isLoading,
      error: channel.error || channels.error,
      content: channel.content,
      isEditing: channel.isEditing || false
    };
  }
);

export const selectActiveChannelEmails = createSelector<IRootState, IChannelsState, Set<string>>(
  [selectChannelsState],
  (channels: IChannelsState): Set<string> => {
    if (!channels.active) {
      return Set.of('');
    }
    const channel = channels.content.get(channels.active);
    return channel.content.accountEmails;
  }
);

export const selectActiveAccountEmails = createSelector(
  [selectActiveChannel],
  (channel: ILoadable<IChannel|null>): ILoadable<Set<string>|null> => ({
    ...channel,
    content: channel.content ? channel.content.accountEmails : null
  })
);
