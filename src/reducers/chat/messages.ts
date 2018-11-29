import {Map} from 'immutable';
import {IMessagesState} from '../../states/chat/IMessagesState';
import {IMessage} from '../../models/chat/IMessage';
import {
  SLEK_CHANNEL_SELECTION_FAILED,
  SLEK_CHANNEL_SELECTION_STARTED,
  SLEK_CHANNEL_SELECTION_SUCCEEDED,
  SLEK_MESSAGE_CREATION_FAILED,
  SLEK_MESSAGE_CREATION_STARTED,
  SLEK_MESSAGE_CREATION_SUCCEEDED,
  SLEK_MESSAGE_DELETION_FAILED,
  SLEK_MESSAGE_DELETION_STARTED,
  SLEK_MESSAGE_DELETION_SUCCEEDED, SLEK_MESSAGE_VOTE_DOWN_FAILED, SLEK_MESSAGE_VOTE_DOWN_STARTED, SLEK_MESSAGE_VOTE_DOWN_SUCCEEDED, SLEK_MESSAGE_VOTE_UP_FAILED,
  SLEK_MESSAGE_VOTE_UP_STARTED,
  SLEK_MESSAGE_VOTE_UP_SUCCEEDED,
  SLEK_MESSAGES_GETTING_FAILED,
  SLEK_MESSAGES_GETTING_STARTED,
  SLEK_MESSAGES_GETTING_SUCCEEDED
} from '../../constants/actions';

export const messages = (state: IMessagesState = {
                           isLoading: false,
                           error: null,
                           content: Map<Uuid, IMessage>()
                         },
                         action: Action): IMessagesState => {
  switch (action.type) {
    case SLEK_CHANNEL_SELECTION_STARTED:
    case SLEK_MESSAGES_GETTING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case SLEK_CHANNEL_SELECTION_SUCCEEDED:
    case SLEK_MESSAGES_GETTING_SUCCEEDED:
      const messagesMap = Map<Uuid, IMessage>(action.payload.messages.map((msg: IMessage) => [msg.id, msg]));
      return {
        ...state,
        isLoading: false,
        error: false,
        content: Map<Uuid, IMessage>(state.content.filter((msg: IMessage) => msg.channelId !== action.payload.channelId)).merge(messagesMap)
      };
    case SLEK_CHANNEL_SELECTION_FAILED:
    case SLEK_MESSAGES_GETTING_FAILED:
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
    case SLEK_MESSAGE_DELETION_STARTED:
      return {
        ...state,
        content: state.content.remove(action.payload)
      };
    case SLEK_MESSAGE_DELETION_SUCCEEDED:
      return state;
    case SLEK_MESSAGE_DELETION_FAILED:
      // TODO
      return state;
    case SLEK_MESSAGE_VOTE_UP_STARTED:
      const messageToUpVote = state.content.get(action.payload);
      return {
        ...state,
        content: state.content.set(action.payload, {
          ...messageToUpVote,
          votes: messageToUpVote.votes + 1
        })
      };
    case SLEK_MESSAGE_VOTE_UP_SUCCEEDED:
      return state;
    case SLEK_MESSAGE_VOTE_UP_FAILED:
      // TODO
      return state;
    case SLEK_MESSAGE_VOTE_DOWN_STARTED:
      const messageToDownVote = state.content.get(action.payload);
      return {
        ...state,
        content: state.content.set(action.payload, {
          ...messageToDownVote,
          votes: messageToDownVote.votes - 1
        })
      };
    case SLEK_MESSAGE_VOTE_DOWN_SUCCEEDED:
      return state;
    case SLEK_MESSAGE_VOTE_DOWN_FAILED:
      // TODO
      return state;
    default:
      return state;
  }
};
