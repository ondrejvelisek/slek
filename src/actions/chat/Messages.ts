import {
  SLEK_FILE_MESSAGE_UPLOADING_FAILED,
  SLEK_FILE_MESSAGE_UPLOADING_STARTED,
  SLEK_FILE_MESSAGE_UPLOADING_SUCCEEDED,
  SLEK_MESSAGE_CREATION_FAILED,
  SLEK_MESSAGE_CREATION_STARTED,
  SLEK_MESSAGE_CREATION_SUCCEEDED,
  SLEK_MESSAGE_DELETION_FAILED,
  SLEK_MESSAGE_DELETION_STARTED,
  SLEK_MESSAGE_DELETION_SUCCEEDED,
  SLEK_MESSAGE_VOTE_DOWN_FAILED,
  SLEK_MESSAGE_VOTE_DOWN_STARTED,
  SLEK_MESSAGE_VOTE_DOWN_SUCCEEDED,
  SLEK_MESSAGE_VOTE_UP_FAILED,
  SLEK_MESSAGE_VOTE_UP_STARTED,
  SLEK_MESSAGE_VOTE_UP_SUCCEEDED,
  SLEK_MESSAGES_GETTING_FAILED,
  SLEK_MESSAGES_GETTING_STARTED,
  SLEK_MESSAGES_GETTING_SUCCEEDED
} from '../../constants/actions';
import {IMessage} from '../../models/chat/IMessage';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IMessageData, MessageType} from '../../models/chat/IMessageData';
import {v4 as uuid} from 'uuid';
import {IServices} from '../../services';
import * as _ from 'lodash';


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
    title: `Message from ${email}`,
    value: text,
    channelId,
    type: MessageType.Text,
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

const fileMessageUploadingStarted = (message: IMessage, tempId: Uuid): Action => ({
  type: SLEK_FILE_MESSAGE_UPLOADING_STARTED,
  payload: {
    message,
    tempId
  }
});

const fileMessageUploadingSucceeded = (message: IMessage, tempId: Uuid): Action => ({
  type: SLEK_FILE_MESSAGE_UPLOADING_SUCCEEDED,
  payload: {
    message,
    tempId
  }
});

const fileMessageUploadingFailed = (tempId: Uuid): Action => ({
  type: SLEK_FILE_MESSAGE_UPLOADING_FAILED,
  payload: {
    tempId
  }
});

const getTempFileMessage = async (file: File, email: string, channelId: Uuid): Promise<IMessageData> => {
  return {
    title: file.name,
    value: await readAsDataURL(file),
    channelId,
    type: isImage(file.name) ? MessageType.Image : MessageType.File,
    createdBy: email,
    createdAt: new Date().toISOString(),
    updatedBy: email,
    updatedAt: new Date().toISOString(),
    votes: 0
  };
};

export const uploadFileMessage = (file: File): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, getState, {chatService}) => {
    const tempId = uuid();
    try {
      const channelId = getState().chat.channels.active;
      if (!channelId) {
        throw new Error('Sending file message without active channel');
      }
      const account = getState().chat.auth.content;
      if (!account) {
        throw new Error('Sending file message without active account');
      }
      const messageData: IMessageData = await getTempFileMessage(file, account.email, channelId);
      dispatch(fileMessageUploadingStarted({id: tempId, ...messageData}, tempId));
      const metadata = await chatService.uploadFile(file);
      const fileUrl = await chatService.getFileLink(metadata.id);
      const message = await chatService.createMessage(channelId, {
        ...messageData,
        value: fileUrl,
        title: metadata.name
      });
      dispatch(fileMessageUploadingSucceeded(message, tempId));
    } catch (e) {
      dispatch(fileMessageUploadingFailed(tempId));
    }
  };

const isImage = (fileName: string): boolean => {
  const re = /(?:\.([^.]+))?$/;
  const supportedExtensions = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'webp'];
  return _.some(supportedExtensions, sup => {
    const ext = re.exec(fileName);
    if (!ext) {
      return false;
    }
    return ext[1].includes(sup);
  });
};

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string|null|undefined;
      if (!dataUrl) {
        reject(dataUrl);
      } else {
        resolve(dataUrl);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
      const upVotedMessage = getState().chat.messages.content.get(messageId);
      if (!upVotedMessage) {
        throw new Error('Voting Up message witch does not exists');
      }
      // const upVotedMessage: IMessage = {...message, votes: message.votes + 1 };
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
      const downVotedMessage = getState().chat.messages.content.get(messageId);
      if (!downVotedMessage) {
        throw new Error('Voting Down message witch does not exists');
      }
      // const downVotedMessage: IMessage = {...message, votes: message.votes - 1 };
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
