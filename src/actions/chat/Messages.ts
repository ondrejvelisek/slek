import {
  SLEK_MESSAGE_CREATION_STARTED,
  SLEK_MESSAGE_CREATION_FAILED,
  SLEK_MESSAGE_CREATION_SUCCEEDED,
  SLEK_MESSAGES_GETTING_STARTED,
  SLEK_MESSAGES_GETTING_FAILED,
  SLEK_MESSAGES_GETTING_SUCCEEDED,
  SLEK_MESSAGE_DELETION_SUCCEEDED,
  SLEK_MESSAGE_DELETION_FAILED,
  SLEK_MESSAGE_DELETION_STARTED
} from '../../constants/actions';
import {IMessage} from '../../models/chat/IMessage';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IMessageData} from '../../models/chat/IMessageData';
import {v4 as uuid} from 'uuid';
import {IServices} from '../../services';


const messageCreationStarted = (message: IMessage, tempId: Uuid): Action => ({
  type: SLEK_MESSAGE_CREATION_STARTED,
  payload: {
    message,
    tempId
  }
});

const messageCreationSucceeded = (message: IMessage, tempId: Uuid): Action => ({
  type: SLEK_MESSAGE_CREATION_SUCCEEDED,
  payload: {
    message,
    tempId
  }
});

const messageCreationFailed = (tempId: Uuid): Action => ({
  type: SLEK_MESSAGE_CREATION_FAILED,
  payload: {
    tempId
  }
});

export const createMessage = (text: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
  const tempId = uuid();
  try {
    const channelId = getState().chat.channels.active;
    if (!channelId) {
      throw new Error('Sending message without active channel');
    }
    const account = getState().chat.auth.content;
    if (!account) {
      throw new Error('Sending message without active account');
    }
    const messageData: IMessageData = {text, channelId, accountEmail: account.email};
    dispatch(messageCreationStarted({id: tempId, ...messageData}, tempId));
    const message = await chatService.createMessage(channelId, messageData);
    dispatch(messageCreationSucceeded(message, tempId));
  } catch (e) {
    dispatch(messageCreationFailed(tempId));
  }
};

const messageDeletionStarted = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_DELETION_STARTED,
  payload: messageId
});

const messageDeletionSucceeded = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_DELETION_SUCCEEDED,
  payload: messageId
});

const messageDeletionFailed = (): Action => ({
  type: SLEK_MESSAGE_DELETION_FAILED
});

export const deleteMessage = (messageId: Uuid): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
  try {
    dispatch(messageDeletionStarted(messageId));
    const channelId = getState().chat.channels.active;
    if (!channelId) {
      throw new Error('Deleting message without active channel');
    }
    await chatService.deleteMessage(channelId, messageId);
    dispatch(messageDeletionSucceeded(messageId));
  } catch (e) {
    dispatch(messageDeletionFailed());
  }
};

const messagesGettingStarted = (): Action => ({
  type: SLEK_MESSAGES_GETTING_STARTED,
});

const messagesGettingSucceeded = (messages: Immutable.List<IMessage>): Action => ({
  type: SLEK_MESSAGES_GETTING_SUCCEEDED,
  payload: messages
});

const messagesGettingFailed = (): Action => ({
  type: SLEK_MESSAGES_GETTING_FAILED
});

export const getMessages = (): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
  try {
    dispatch(messagesGettingStarted());
    const channelId = getState().chat.channels.active;
    if (!channelId) {
      throw new Error('Getting message without active channel');
    }
    const messages = await chatService.getMessages(channelId, 50);
    dispatch(messagesGettingSucceeded(messages));
  } catch (e) {
    dispatch(messagesGettingFailed());
  }
};
