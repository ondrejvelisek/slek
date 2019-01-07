export interface IAccountData {
  readonly name: string;
  readonly avatar: string|null;
  readonly channelOrder: Uuid[];
}
