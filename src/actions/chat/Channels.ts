import {
  SLEK_ADD_CHANNEL,
  SLEK_ADD_CHANNEL_FAILURE,
  SLEK_ADD_CHANNEL_SUCCESS,
  SLEK_CHANNELS_MOUNTED,
  SLEK_GET_CHANNELS_FAILURE,
  SLEK_GET_CHANNELS_SUCCESS,
  SLEK_REMOVE_CHANNEL, SLEK_REMOVE_CHANNEL_FAILURE,
  SLEK_REMOVE_CHANNEL_SUCCESS,
  SLEK_SELECT_CHANNEL
} from '../../constants/actions';
import {IChannel} from '../../models/chat/IChannel';
import * as Immutable from 'immutable';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IRootState} from '../../states/IRootState';
import * as api from '../../api/api';
import {IChannelData} from '../../models/chat/IChannelData';
import {v4 as uuid} from 'uuid';

const addChannelSuccess = (channel: IChannel, tempId: Uuid): Action => ({
  type: SLEK_ADD_CHANNEL_SUCCESS,
  payload: {
    channel,
    tempId
  }
});

const addChannelFailure = (tempId: Uuid): Action => ({
  type: SLEK_ADD_CHANNEL_FAILURE,
  payload: {
    tempId
  }
});

export const addChannel = (channelData: IChannelData, token: string): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  const tempId = uuid();
  try {
    dispatch({
      type: SLEK_ADD_CHANNEL,
      payload: {
        channelData,
        tempId
      }
    });
    const channel = await api.addChannel(channelData, token);
    dispatch(addChannelSuccess(channel, tempId));
  } catch (e) {
    dispatch(addChannelFailure(tempId));
  }
};

const removeChannelSuccess = (channelId: Uuid): Action => ({
  type: SLEK_REMOVE_CHANNEL_SUCCESS,
  payload: channelId
});

const removeChannelFailure = (): Action => ({
  type: SLEK_REMOVE_CHANNEL_FAILURE
});

export const removeChannel = (channelId: Uuid, token: string): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  try {
    dispatch({
      type: SLEK_REMOVE_CHANNEL,
      payload: channelId
    });
    await api.removeChannel(channelId, token);
    dispatch(removeChannelSuccess(channelId));
  } catch (e) {
    dispatch(removeChannelFailure());
  }
};

export const selectChannel = (channelId: Uuid) => ({
  type: SLEK_SELECT_CHANNEL,
  payload: channelId
});

const getChannelsSuccess = (channels: Immutable.List<IChannel>): Action => ({
  type: SLEK_GET_CHANNELS_SUCCESS,
  payload: channels
});

const getChannelsFailure = (): Action => ({
  type: SLEK_GET_CHANNELS_FAILURE
});

export const channelsMounted = (token: string): ThunkAction<void, IRootState, void, Action> => async (dispatch: ThunkDispatch<IRootState, void, Action>) => {
  try {
    dispatch({
      type: SLEK_CHANNELS_MOUNTED
    });
    const channels = await api.getChannels(token);
    dispatch(getChannelsSuccess(channels));
  } catch (e) {
    dispatch(getChannelsFailure());
  }
};
