import {
  SLEK_CHANNEL_CREATION_STARTED,
  SLEK_CHANNEL_CREATION_FAILED,
  SLEK_CHANNEL_CREATION_SUCCEEDED,
  SLEK_CHANNELS_GETTING_STARTED,
  SLEK_CHANNELS_GETTING_FAILED,
  SLEK_CHANNELS_GETTING_SUCCEEDED,
  SLEK_CHANNEL_DELETION_STARTED,
  SLEK_CHANNEL_DELETION_SUCCEEDED,
  SLEK_CHANNEL_DELETION_FAILED,
  SLEK_CHANNEL_SELECTION_STARTED,
  SLEK_CHANNEL_EDITING_STARTED,
  SLEK_CHANNEL_EDITING_CANCELED,
  SLEK_CHANNEL_UPDATING_STARTED,
  SLEK_CHANNEL_UPDATING_SUCCEEDED, SLEK_CHANNEL_UPDATING_FAILED
} from '../../constants/actions';
import * as Immutable from 'immutable';
import {IChannel} from '../../models/chat/IChannel';
import {IChannelsState} from '../../states/chat/IChannelsState';
import {ILoadable} from '../../states/common/ILoadable';
import {IEditable} from '../../states/common/IEditable';

export const channels = (state: IChannelsState = {
                             active: null,
                             isLoading: false,
                             error: null,
                             content: Immutable.Map<Uuid, ILoadable<IChannel> & IEditable>()
                           },
                         action: Action): IChannelsState => {
  switch (action.type) {
    case SLEK_CHANNELS_GETTING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SLEK_CHANNELS_GETTING_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        error: null,
        // TODO what if there was active tempId?
        content: action.payload.reduce(
          (map: Immutable.Map<Uuid, ILoadable<IChannel> & IEditable>, value: IChannel) =>
            map.set(value.id, {isLoading: false, error: null, content: { ...value}, isEditing: false}),
          Immutable.Map())
      };
    case SLEK_CHANNELS_GETTING_FAILED:
      return {
        ...state,
        active: null,
        isLoading: false,
        error: true
      };
    case SLEK_CHANNEL_CREATION_STARTED:
      return {
        ...state,
        active: action.payload.tempId,
        content: state.content.set(action.payload.tempId, {
          isLoading: true,
          error: null,
          content: { ...action.payload.channelData, id: action.payload.tempId },
          isEditing: false
        })
      };
    case SLEK_CHANNEL_CREATION_SUCCEEDED:
      console.log(action.payload);
      return {
        ...state,
        active: state.active === action.payload.tempId ? action.payload.channel.id : state.active,
        content: state.content
          .set(action.payload.channel.id, {
            isLoading: false,
            error: null,
            isEditing: false,
            content: {...action.payload.channel}
          })
          .remove(action.payload.tempId)
      };
    case SLEK_CHANNEL_CREATION_FAILED:
      return {
        ...state,
        content: state.content.update(action.payload.tempId, channel => ({...channel, isLoading: false, error: true}))
      };
    case SLEK_CHANNEL_SELECTION_STARTED:
      return {
        ...state,
        active: action.payload
      };
    case SLEK_CHANNEL_EDITING_STARTED:
      return {
        ...state,
        content: state.content.update(action.payload.id, channel => ({...channel, isEditing: true}))
      };
    case SLEK_CHANNEL_EDITING_CANCELED:
      return {
        ...state,
        content: state.content.update(action.payload.id, channel => ({...channel, isEditing: false}))
      };
    case SLEK_CHANNEL_UPDATING_STARTED:
      return {
        ...state,
        content: state.content.update(action.payload.channel.id, channel => ({...channel, isLoading: true, isEditing: false}))
      };
    case SLEK_CHANNEL_UPDATING_SUCCEEDED: {
      const {channel} = action.payload;
      return {
        ...state,
        content: state.content.set(channel.id, {
          isLoading: false,
          error: null,
          isEditing: false,
          content: {...channel}
        })
      };
    }
    case SLEK_CHANNEL_UPDATING_FAILED:
      return {
        ...state,
        content: state.content.update(action.payload.id, channel => ({...channel, isLoading: false, error: true}))
      };
    case SLEK_CHANNEL_DELETION_STARTED:
      return {
        ...state,
        active: state.active === action.payload ? null : state.active,
        content: state.content.update(action.payload, channel => ({...channel, isLoading: true}))
      };
    case SLEK_CHANNEL_DELETION_SUCCEEDED:
      return {
        ...state,
        active: state.active === action.payload ? null : state.active,
        content: state.content.remove(action.payload)
      };
    case SLEK_CHANNEL_DELETION_FAILED:
      return {
        ...state,
        active: state.active === action.payload ? null : state.active,
        content: state.content.update(action.payload, channel => ({...channel, isLoading: false, error: true}))
      };
    default:
      return state;
  }
};
