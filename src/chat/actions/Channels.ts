import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL } from '../constants/actions';
import * as Immutable from 'immutable';

export const addChannel = (name: string, messages: number, accountIds: Immutable.List<number>): Action => ({
  type: SLEK_ADD_CHANNEL,
  payload: {
    id: Math.random(),
    channel: {
      name, messages, accountIds
    }
  }
});

export const removeChannel = () => ({
  type: SLEK_REMOVE_CHANNEL
});
