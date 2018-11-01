import {
  SLEK_ADD_CHANNEL,
  SLEK_ADD_CHANNEL_FAILURE,
  SLEK_ADD_CHANNEL_SUCCESS,
  SLEK_CHANNELS_MOUNTED,
  SLEK_GET_CHANNELS_FAILURE,
  SLEK_GET_CHANNELS_SUCCESS,
  SLEK_REMOVE_CHANNEL, SLEK_REMOVE_CHANNEL_FAILURE,
  SLEK_REMOVE_CHANNEL_SUCCESS,
  SLEK_SELECT_CHANNEL
} from '../../constants/actions';
import * as Immutable from 'immutable';
import {IChannel} from '../../models/chat/IChannel';
import {IChannelsState} from '../../states/chat/IChannelsState';
import {ILoadable} from '../../states/common/ILoadable';

export const channels = (state: IChannelsState = {
                             active: null,
                             isLoading: false,
                             error: null,
                             content: Immutable.Map<Uuid, ILoadable<IChannel>>()
                           },
                         action: Action): IChannelsState => {
  switch (action.type) {
    case SLEK_CHANNELS_MOUNTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_GET_CHANNELS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        // TODO what if there was active tempId?
        content: action.payload.reduce(
          (map: Immutable.Map<Uuid, ILoadable<IChannel>>, value: IChannel) =>
            map.set(value.id, {isLoading: false, error: null, content: value}),
          Immutable.Map())
      };
    case SLEK_GET_CHANNELS_FAILURE:
      return {
        ...state,
        active: null,
        isLoading: false,
        error: true
      };
    case SLEK_ADD_CHANNEL:
      return {
        ...state,
        active: action.payload.tempId,
        content: state.content.set(action.payload.tempId, {
          isLoading: true,
          error: null,
          content: { ...action.payload.channelData, id: action.payload.tempId }
        })
      };
    case SLEK_ADD_CHANNEL_SUCCESS:
      return {
        ...state,
        active: state.active === action.payload.tempId ? action.payload.channel.id : state.active,
        content: state.content
          .set(action.payload.channel.id, {isLoading: false, error: null, content: action.payload.channel})
          .remove(action.payload.tempId)
      };
    case SLEK_ADD_CHANNEL_FAILURE:
      return {
        ...state,
        content: state.content.update(action.payload.tempId, channel => ({...channel, isLoading: false, error: true}))
      };
    case SLEK_SELECT_CHANNEL:
      return {
        ...state,
        active: action.payload
      };
    case SLEK_REMOVE_CHANNEL:
      return {
        ...state,
        active: state.active === action.payload ? null : state.active,
        content: state.content.update(action.payload, channel => ({...channel, isLoading: true}))
      };
    case SLEK_REMOVE_CHANNEL_SUCCESS:
      return {
        ...state,
        active: state.active === action.payload ? null : state.active,
        content: state.content.remove(action.payload)
      };
    case SLEK_REMOVE_CHANNEL_FAILURE:
      return {
        ...state,
        active: state.active === action.payload ? null : state.active,
        content: state.content.update(action.payload, channel => ({...channel, isLoading: false, error: true}))
      };
    default:
      return state;
  }
};

