import {
  SLEK_CHANNEL_CREATION_STARTED,
  SLEK_CHANNEL_CREATION_FAILED,
  SLEK_CHANNEL_CREATION_SUCCEEDED,
  SLEK_CHANNELS_GETTING_STARTED,
  SLEK_CHANNELS_GETTING_FAILED,
  SLEK_CHANNELS_GETTING_SUCCEEDED,
  SLEK_CHANNEL_DELETION_SUCCEEDED,
  SLEK_CHANNEL_DELETION_FAILED,
  SLEK_CHANNEL_DELETION_STARTED,
  SLEK_CHANNEL_SELECTION_STARTED,
  SLEK_CHANNEL_SELECTION_SUCCEEDED,
  SLEK_CHANNEL_SELECTION_FAILED,
  SLEK_CHANNEL_UPDATING_STARTED,
  SLEK_CHANNEL_UPDATING_SUCCEEDED,
  SLEK_CHANNEL_UPDATING_FAILED,
  SLEK_CHANNEL_EDITING_CANCELED,
  SLEK_CHANNEL_EDITING_STARTED,
  SLEK_CHANNEL_SUBSCRIBE_USER_STARTED,
  SLEK_CHANNEL_SUBSCRIBE_USER_SUCCEEDED,
  SLEK_CHANNEL_SUBSCRIBE_USER_FAILED,
  SLEK_CHANNEL_UNSUBSCRIBE_USER_FAILED,
  SLEK_CHANNEL_UNSUBSCRIBE_USER_SUCCEEDED,
  SLEK_CHANNEL_UNSUBSCRIBE_USER_STARTED
} from '../../constants/actions';
import {IChannel} from '../../models/chat/IChannel';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IChannelData} from '../../models/chat/IChannelData';
import {v4 as uuid} from 'uuid';
import {IServices} from '../../services';
import {IMessage} from '../../models/chat/IMessage';


const channelCreationStarted = (channel: IChannelData, tempId: Uuid): Action => ({
  type: SLEK_CHANNEL_CREATION_STARTED,
  payload: {
    channel,
    tempId
  }
});

const channelCreationSucceeded = (channel: IChannel, tempId: Uuid): Action => ({
  type: SLEK_CHANNEL_CREATION_SUCCEEDED,
  payload: {
    channel,
    tempId
  }
});

const channelCreationFailed = (tempId: Uuid): Action => ({
  type: SLEK_CHANNEL_CREATION_FAILED,
  payload: {
    tempId
  }
});

export const createChannel = (channelName: string, activeEmail: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    const tempId = uuid();
    const channelData: IChannelData = {
      name: channelName,
      unread: 0,
      accountEmails: Immutable.Set.of(activeEmail)
    };
    try {
      dispatch(channelCreationStarted(channelData, tempId));
      const channel = await chatService.createChannel(channelData);
      dispatch(channelCreationSucceeded(channel, tempId));
    } catch (e) {
      dispatch(channelCreationFailed(tempId));
    }
  };

const channelUpdateStarted = (channel: IChannel): Action => ({
  type: SLEK_CHANNEL_UPDATING_STARTED,
  payload: {
    channel
  }
});

const channelUpdateSucceeded = (channel: IChannel): Action => ({
  type: SLEK_CHANNEL_UPDATING_SUCCEEDED,
  payload: {
    channel
  }
});

const channelUpdateFailed = (id: Uuid): Action => ({
  type: SLEK_CHANNEL_UPDATING_FAILED,
  payload: {
    id
  }
});

export const cancelEditingChannel = (id: Uuid): Action => ({
  type: SLEK_CHANNEL_EDITING_CANCELED,
  payload: {
    id
  }
});

export const startEditingChannel = (id: Uuid): Action => ({
  type: SLEK_CHANNEL_EDITING_STARTED,
  payload: {
    id
  }
});

export const updateChannel = (oldChannel: IChannel, newName: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      const newChannel = {
        ...oldChannel,
        name: newName
      };
      dispatch(channelUpdateStarted(newChannel));
      const channel = await chatService.updateChannel(newChannel);
      dispatch(channelUpdateSucceeded(channel));
    } catch (e) {
      dispatch(channelUpdateFailed(oldChannel.id));
    }
  };

const channelSubscribeUserStarted = (channel: IChannel): Action => ({
  type: SLEK_CHANNEL_SUBSCRIBE_USER_STARTED,
  payload: {
    channel
  }
});

const channelSubscribeUserSucceeded = (channel: IChannel): Action => ({
  type: SLEK_CHANNEL_SUBSCRIBE_USER_SUCCEEDED,
  payload: {
    channel
  }
});

const channelSubscribeUserFailed = (id: Uuid): Action => ({
  type: SLEK_CHANNEL_SUBSCRIBE_USER_FAILED,
  payload: {
    id
  }
});

export const channelSubscribeUser = (oldChannel: IChannel, userEmail: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      const newChannel = {
        ...oldChannel,
        accountEmails: Immutable.Set.of(userEmail).union(oldChannel.accountEmails)
      };
      dispatch(channelSubscribeUserStarted(newChannel));
      const channel = await chatService.updateChannel(newChannel);
      dispatch(channelSubscribeUserSucceeded(channel));
    } catch (e) {
      dispatch(channelSubscribeUserFailed(oldChannel.id));
    }
  };

const channelUnsubscribeUserStarted = (channel: IChannel): Action => ({
  type: SLEK_CHANNEL_UNSUBSCRIBE_USER_STARTED,
  payload: {
    channel
  }
});

const channelUnsubscribeUserSucceeded = (channel: IChannel): Action => ({
  type: SLEK_CHANNEL_UNSUBSCRIBE_USER_SUCCEEDED,
  payload: {
    channel
  }
});

const channelUnsubscribeUserFailed = (id: Uuid): Action => ({
  type: SLEK_CHANNEL_UNSUBSCRIBE_USER_FAILED,
  payload: {
    id
  }
});

export const channelUnsubscribeUser = (oldChannel: IChannel, userEmail: string): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      const emails = Immutable.Set<string>().union(oldChannel.accountEmails).subtract([userEmail]);
      const newChannel = {
        ...oldChannel,
        accountEmails: emails
      };
      dispatch(channelUnsubscribeUserStarted(newChannel));
      const channel = await chatService.updateChannel(newChannel);
      dispatch(channelUnsubscribeUserSucceeded(channel));
    } catch (e) {
      console.log(e);
      dispatch(channelUnsubscribeUserFailed(oldChannel.id));
    }
  };

const channelDeletionStarted = (channelId: Uuid): Action => ({
  type: SLEK_CHANNEL_DELETION_STARTED,
  payload: channelId
});

const channelDeletionSucceeded = (channelId: Uuid): Action => ({
  type: SLEK_CHANNEL_DELETION_SUCCEEDED,
  payload: channelId
});

const channelDeletionFailed = (): Action => ({
  type: SLEK_CHANNEL_DELETION_FAILED
});

export const deleteChannel = (channelId: Uuid): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(channelDeletionStarted(channelId));
      await chatService.deleteChannel(channelId);
      dispatch(channelDeletionSucceeded(channelId));
    } catch (e) {
      dispatch(channelDeletionFailed());
    }
  };

export const channelSelectionStarted = (channelId: Uuid) => ({
  type: SLEK_CHANNEL_SELECTION_STARTED,
  payload: channelId
});

export const channelSelectionSucceeded = (channelId: Uuid, messages: Immutable.List<IMessage>) => ({
  type: SLEK_CHANNEL_SELECTION_SUCCEEDED,
  payload: {
    messages,
    channelId
  }
});

export const channelSelectionFailed = (channelId: Uuid) => ({
  type: SLEK_CHANNEL_SELECTION_FAILED,
  payload: channelId
});

export const selectChannel = (channelId: Uuid): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(channelSelectionStarted(channelId));
      const messages = await chatService.getMessages(channelId, 50);
      dispatch(channelSelectionSucceeded(channelId, messages));
    } catch (e) {
      dispatch(channelSelectionFailed(channelId));
    }
  };

const channelsGettingStarted = (): Action => ({
  type: SLEK_CHANNELS_GETTING_STARTED,
});

const channelsGettingSucceeded = (channels: Immutable.List<IChannel>): Action => ({
  type: SLEK_CHANNELS_GETTING_SUCCEEDED,
  payload: channels
});

const channelsGettingFailed = (): Action => ({
  type: SLEK_CHANNELS_GETTING_FAILED
});

export const getChannels = (): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
    try {
      dispatch(channelsGettingStarted());
      const channels = await chatService.getChannels();
      dispatch(channelsGettingSucceeded(channels));
    } catch (e) {
      dispatch(channelsGettingFailed());
    }
  };
