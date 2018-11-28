export interface IMessageData {
  readonly value: string;
  readonly channelId: Uuid;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
}
