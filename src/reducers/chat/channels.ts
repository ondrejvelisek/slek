import { SLEK_ADD_CHANNEL, SLEK_REMOVE_CHANNEL} from '../../constants/actions';
import * as Immutable from 'immutable';
import {IChannel} from '../../models/chat/IChannel';
import {IChannelsState} from '../../states/chat/IChannelsState';

export const channels = (state: IChannelsState = {
                             active: null,
                             isLoading: false,
                             error: null,
                             content: Immutable.Map<Uuid, IChannel>()
                           },
                         action: Action): IChannelsState => {
  switch (action.type) {
    case SLEK_ADD_CHANNEL:
      return {
        ...state,
        active: action.payload.id,
        content: state.content.set(action.payload.id, action.payload.channel)
      };
    case SLEK_REMOVE_CHANNEL:
      return state;
    default:
      return state;
  }
};

