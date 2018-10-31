import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL} from '../../constants/actions';
import { IChannelsListState } from '../../states/chat/IChat';
import * as Immutable from 'immutable';
import {IChannel} from '../../models/chat/IChannel';

export const channels = (state: IChannelsListState =
                              {
                                active: 0,
                                channels: {
                                  isLoading: false,
                                  error: null,
                                  content: Immutable.Map<Uuid, IChannel>()
                                }
                              },
                         action: Action): IChannelsListState => {
  switch (action.type) {
    case SLEK_ADD_CHANNEL:
      return {
        ...state,
        active: action.payload.id,
        channels: {
          isLoading: action.payload.isLoading,
          error: action.payload.error,
          content: {
            ...state.channels.content,
            [action.payload.id]: action.payload.channel
          }
        }
      };
    case SLEK_REMOVE_CHANNEL:
      return state;
    default:
      return state;
  }
};

