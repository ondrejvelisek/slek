export interface IMessageData {
  readonly value: string;
  readonly channelId: Uuid;
  readonly votes: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
}
