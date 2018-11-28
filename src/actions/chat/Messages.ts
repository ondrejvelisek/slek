import {
  SLEK_MESSAGE_CREATION_STARTED,
  SLEK_MESSAGE_CREATION_FAILED,
  SLEK_MESSAGE_CREATION_SUCCEEDED,
  SLEK_MESSAGES_GETTING_STARTED,
  SLEK_MESSAGES_GETTING_FAILED,
  SLEK_MESSAGES_GETTING_SUCCEEDED,
  SLEK_MESSAGE_DELETION_SUCCEEDED,
  SLEK_MESSAGE_DELETION_FAILED,
  SLEK_MESSAGE_DELETION_STARTED, SLEK_MESSAGE_VOTE_UP_FAILED, SLEK_MESSAGE_VOTE_UP_SUCCEEDED, SLEK_MESSAGE_VOTE_UP_STARTED, SLEK_MESSAGE_VOTE_DOWN_STARTED, SLEK_MESSAGE_VOTE_DOWN_SUCCEEDED, SLEK_MESSAGE_VOTE_DOWN_FAILED
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

const createTempMessage = (text: string, email: string, channelId: Uuid): IMessageData => {
  return {
    value: text,
    channelId,
    createdBy: email,
    createdAt: new Date().toISOString(),
    updatedBy: email,
    updatedAt: new Date().toISOString(),
    votes: 0
  };
};

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
      const messageData: IMessageData = createTempMessage(text, account.email, channelId);
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

const messageVoteUpStarted = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_VOTE_UP_STARTED,
  payload: messageId
});

const messageVoteUpSucceeded = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_VOTE_UP_SUCCEEDED,
  payload: messageId
});

const messageVoteUpFailed = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_VOTE_UP_FAILED,
  payload: messageId
});

export const voteMessageUp = (messageId: Uuid): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
    try {
      dispatch(messageVoteUpStarted(messageId));
      const channelId = getState().chat.channels.active;
      if (!channelId) {
        throw new Error('Voting Up message without active channel');
      }
      const message = getState().chat.messages.content.get(messageId);
      if (!message) {
        throw new Error('Voting Up message witch does not exists');
      }
      const upVotedMessage: IMessage = {...message, votes: message.votes + 1 };
      await chatService.updateMessage(channelId, upVotedMessage);
      dispatch(messageVoteUpSucceeded(messageId));
    } catch (e) {
      dispatch(messageVoteUpFailed(messageId));
    }
  };

const messageVoteDownStarted = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_VOTE_DOWN_STARTED,
  payload: messageId
});

const messageVoteDownSucceeded = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_VOTE_DOWN_SUCCEEDED,
  payload: messageId
});

const messageVoteDownFailed = (messageId: Uuid): Action => ({
  type: SLEK_MESSAGE_VOTE_DOWN_FAILED,
  payload: messageId
});

export const voteMessageDown = (messageId: Uuid): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
    try {
      dispatch(messageVoteDownStarted(messageId));
      const channelId = getState().chat.channels.active;
      if (!channelId) {
        throw new Error('Voting Down message without active channel');
      }
      const message = getState().chat.messages.content.get(messageId);
      if (!message) {
        throw new Error('Voting Down message witch does not exists');
      }
      const downVotedMessage: IMessage = {...message, votes: message.votes - 1 };
      await chatService.updateMessage(channelId, downVotedMessage);
      dispatch(messageVoteDownSucceeded(messageId));
    } catch (e) {
      dispatch(messageVoteDownFailed(messageId));
    }
  };

const messagesGettingStarted = (channelId: Uuid): Action => ({
  type: SLEK_MESSAGES_GETTING_STARTED,
  payload: channelId
});

const messagesGettingSucceeded = (channelId: Uuid, messages: Immutable.List<IMessage>): Action => ({
  type: SLEK_MESSAGES_GETTING_SUCCEEDED,
  payload: {
    messages,
    channelId
  }
});

const messagesGettingFailed = (channelId: Uuid|null): Action => ({
  type: SLEK_MESSAGES_GETTING_FAILED,
  payload: channelId
});

export const getMessages = (): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
    const channelId = getState().chat.channels.active;
    try {
      if (!channelId) {
        throw new Error('Getting message without active channel');
      }
      dispatch(messagesGettingStarted(channelId));
      const messages = await chatService.getMessages(channelId, 50);
      dispatch(messagesGettingSucceeded(channelId, messages));
    } catch (e) {
      dispatch(messagesGettingFailed(channelId));
    }
  };
