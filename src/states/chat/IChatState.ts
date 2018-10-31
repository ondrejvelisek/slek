import {IChannelsState} from './IChannelsState';
import {IAccountsState} from './IAccountsState';
import {IMessagesState} from './IMessagesState';

export interface IChatState {
  readonly channels: IChannelsState;
  readonly accounts: IAccountsState;
  readonly messages: IMessagesState;
}
