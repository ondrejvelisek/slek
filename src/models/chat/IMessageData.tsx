export interface IMessageData {
  readonly channelId: Uuid;
  readonly accountEmail: string;
  readonly text: string;
}
