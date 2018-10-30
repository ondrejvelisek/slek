type Action = {
  type: string;
  payload?: any;
};

//TODO premenovat ..Type na I..
type AvatarType = {
  id?: number,
  image: string,
  className: string,
};

type MessageType = {
  id?: number,
  accountId?: number,
  text: string,
  mine?: boolean,
};

type AccountType = {
  id?: number,
  name: string,
  avatar: string,
  // avatar: AvatarType
};

type ChannelType = {
  id: number,
  name: string,
  messages: number,
  accountIds: number[],
};
