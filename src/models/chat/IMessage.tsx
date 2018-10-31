export interface IMessage {
  id?: Uuid;
  accountId?: Uuid;
  text: string;
  mine?: boolean;
}
