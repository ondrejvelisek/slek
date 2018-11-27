import * as Immutable from 'immutable';
import {IMessagesState} from '../../states/chat/IMessagesState';
import {IMessage} from '../../models/chat/IMessage';
import {SLEK_CHANNEL_SELECTION_FAILED, SLEK_CHANNEL_SELECTION_STARTED, SLEK_CHANNEL_SELECTION_SUCCEEDED} from '../../constants/actions';
import * as _ from 'lodash';

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
      return {
        ...state,
        isLoading: false,
        error: false,
        content: state.content.merge(_.keyBy(action.payload.messages.toArray(), 'id'))
      };
    case SLEK_CHANNEL_SELECTION_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
