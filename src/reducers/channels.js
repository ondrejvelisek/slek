import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL } from "../constants/actions";

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SLEK_ADD_CHANNEL:
      return {
        ...state,
        active: payload.id,
        content: {
          ...state.content,
          [payload.id]: payload.channel
        }
      };
    case SLEK_REMOVE_CHANNEL:
      return state;
    default:
      return state;
  }
};
