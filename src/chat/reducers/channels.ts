import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL} from '../constants/actions';
import { IChannels } from '../models/IChat';
import * as Immutable from 'immutable';

export const channels = (state: IChannels =
                              {
                                active: 0,
                                isLoading: false,
                                error: null,
                                content: Immutable.List<ChannelType>()
                              },
                         action: Action): IChannels => {
  switch (action.type) {
    case SLEK_ADD_CHANNEL:
      return {
        ...state,
        active: action.payload.id,
        isLoading: action.payload.isLoading,
        error: action.payload.error,
        content: {
          ...state.content,
          [action.payload.id]: action.payload.channel
        }
      };
    case SLEK_REMOVE_CHANNEL:
      return state;
    default:
      return state;
  }
};

