import * as Immutable from 'immutable';

export interface IChannelData {
  name: string;
  unread: number;
  accountIds: Immutable.Set<Uuid>;
}
