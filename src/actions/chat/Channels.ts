import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL } from '../../constants/actions';
import {IChannel} from '../../models/chat/IChannel';

export const addChannel = (channel: IChannel): Action => ({
  type: SLEK_ADD_CHANNEL,
  payload: {
    id: Math.random(),
    channel
  }
});

export const removeChannel = () => ({
  type: SLEK_REMOVE_CHANNEL
});
