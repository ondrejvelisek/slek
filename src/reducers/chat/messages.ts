import * as Immutable from 'immutable';
import {IMessagesState} from '../../states/chat/IMessagesState';
import {IMessage} from '../../models/chat/IMessage';
import {SLEK_CHANNEL_SELECTION_FAILED, SLEK_CHANNEL_SELECTION_STARTED, SLEK_CHANNEL_SELECTION_SUCCEEDED, SLEK_MESSAGE_CREATION_FAILED, SLEK_MESSAGE_CREATION_STARTED, SLEK_MESSAGE_CREATION_SUCCEEDED} from '../../constants/actions';

export const messages = (state: IMessagesState = {
                           isLoading: false,
                           error: null,
                           content: Immutable.Map<Uuid, IMessage>()
                         },
                         action: Action): IMessagesState => {
  switch (action.type) {
    case SLEK_CHANNEL_SELECTION_STARTED:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case SLEK_CHANNEL_SELECTION_SUCCEEDED:
      const messagesMap = Immutable.Map<Uuid, IMessage>(action.payload.messages.map((msg: IMessage) => [msg.id, msg]));
      return {
        ...state,
        isLoading: false,
        error: false,
        content: state.content.merge(messagesMap)
      };
    case SLEK_CHANNEL_SELECTION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case SLEK_MESSAGE_CREATION_STARTED:
      return {
        ...state,
        content: state.content.set(action.payload.tempId, action.payload.message)
      };
    case SLEK_MESSAGE_CREATION_SUCCEEDED:
      return {
        ...state,
        content: state.content.remove(action.payload.tempId).set(action.payload.message.id, action.payload.message)
      };
    case SLEK_MESSAGE_CREATION_FAILED:
      return {
        ...state,
        content: state.content.remove(action.payload.tempId)
      };
    default:
      return state;
  }
};
