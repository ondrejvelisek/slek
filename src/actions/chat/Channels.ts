import {
  SLEK_CHANNEL_CREATION_STARTED,
  SLEK_CHANNEL_CREATION_FAILED,
  SLEK_CHANNEL_CREATION_SUCCEEDED,
  SLEK_CHANNELS_GETTING_STARTED,
  SLEK_CHANNELS_GETTING_FAILED,
  SLEK_CHANNELS_GETTING_SUCCEEDED,
  SLEK_CHANNEL_SELECTED, SLEK_CHANNEL_DELETION_SUCCEEDED, SLEK_CHANNEL_DELETION_FAILED, SLEK_CHANNEL_DELETION_STARTED
} from '../../constants/actions';
import {IChannel} from '../../models/chat/IChannel';
import * as Immutable from 'immutable';
import {ThunkAction} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import {IChannelData} from '../../models/chat/IChannelData';
import {v4 as uuid} from 'uuid';
import {IServices} from '../../services';


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

export const createChannel = (channelData: IChannelData): ThunkAction<void, IRootState, IServices, Action> =>
  async (dispatch, _, {chatService}) => {
  const tempId = uuid();
  try {
    dispatch(channelCreationStarted(channelData, tempId));
    const channel = await chatService.createChannel(channelData);
    dispatch(channelCreationSucceeded(channel, tempId));
  } catch (e) {
    dispatch(channelCreationFailed(tempId));
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

export const selectChannel = (channelId: Uuid) => ({
  type: SLEK_CHANNEL_SELECTED,
  payload: channelId
});

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
    console.log(channels);
    dispatch(channelsGettingSucceeded(channels));
  } catch (e) {
    dispatch(channelsGettingFailed());
  }
};
