import {IChannelsState} from './IChannelsState';
import {IAccountsState} from './IAccountsState';
import {IMessagesState} from './IMessagesState';
import {IAuthState} from './IAuthState';

export interface IChatState {
  readonly channels: IChannelsState;
  readonly accounts: IAccountsState;
  readonly messages: IMessagesState;
  readonly auth: IAuthState;
}
