import * as Immutable from 'immutable';

export interface IChannels {
  readonly isLoading: boolean;
  readonly error: any;
  readonly active: number;
  readonly content: Immutable.List<ChannelType>;
}

export interface ILayoutProps {
  readonly header: any;
  readonly sidebar: any;
  readonly content: any;
  readonly footer: any;
}

//TODO premenovat na State miesto props
//TODO vytvorit genericky interface ILoadable<T> {isLoading, error, content}
export interface IMessagesListProps {
  readonly isLoading: boolean;
  readonly error: any;
  readonly content: Immutable.List<MessageType>;
}

export interface IAccountProps {
  readonly isLoading: boolean;
  readonly error: any;
  readonly content: AccountType;
}

export interface IHeader {
  readonly account: AccountType;
}

export interface IChat {
  readonly channels: IChannels;
  readonly account: number;
  readonly accounts: Immutable.List<IAccountProps>;
  readonly messages: IMessagesListProps;
}

export interface IChatApp {
  channels: IChannels;
}
