import * as Immutable from 'immutable';

export interface IChannelData {
  readonly name: string;
  readonly unread: number;
  readonly accountEmails: Immutable.Set<string>;
}
