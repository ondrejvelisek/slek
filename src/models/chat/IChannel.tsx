export interface IChannel {
  id: Uuid;
  name: string;
  messages: number;
  accountIds: Uuid[];
}
