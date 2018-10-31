import * as Immutable from 'immutable';
import {ILoadable} from '../../models/ILoadable';
import {IAccount} from '../../models/chat/IAccount';
import {IMessage} from '../../models/chat/IMessage';
import {IChannel} from '../../models/chat/IChannel';

export interface IChannelsListState {
  channels: ILoadable<Immutable.Map<Uuid, IChannel>>;
  active: number;
}

export interface IMessagesListState {
  messages: ILoadable<Immutable.Map<Uuid, IMessage>>;
}

export type IAccountState = ILoadable<IAccount>;

export interface IChat {
  readonly channelsState: IChannelsListState;
  readonly account: Uuid;
  readonly accountsState: Immutable.Map<Uuid, IAccountState>;
  readonly messagesState: IMessagesListState;
}

export interface IChatApp {
  channels: IChannelsListState;
}
