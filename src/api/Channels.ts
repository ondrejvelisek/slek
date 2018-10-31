import {IChannel} from '../models/chat/IChannel';
import {IHasId} from '../models/chat/IHasId';

const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

export const addChannel = async (channel: IChannel): Promise<IChannel & IHasId> => {
  await delay(1000);
  return {
    ...channel,
    id: `fake-${Math.random()}`
  };
};
