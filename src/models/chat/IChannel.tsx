import * as Immutable from 'immutable';

export interface IChannel {
  name: string;
  unread: number;
  accountIds: Immutable.Set<Uuid>;
}
