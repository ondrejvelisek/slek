export enum MessageType {
  Text,
  Image,
  File
}

export interface IMessageData {
  readonly title: string;
  readonly value: string;
  readonly channelId: Uuid;
  readonly votes: number;
  readonly type: MessageType;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
}
