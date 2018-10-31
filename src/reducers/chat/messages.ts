import * as Immutable from 'immutable';
import {IMessagesState} from '../../states/chat/IMessagesState';
import {IMessage} from '../../models/chat/IMessage';

export const messages = (state: IMessagesState = {
                           isLoading: false,
                           error: null,
                           content: Immutable.Map<Uuid, IMessage>()
                         },
                         action: Action): IMessagesState => {
  switch (action.type) {
    default:
      return state;
  }
};
