import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL } from "../constants/actions";

export const addChannel = (name, messages, accountIds) => ({
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
