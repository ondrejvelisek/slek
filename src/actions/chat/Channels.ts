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
import {push} from 'connected-react-router';

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

export const addChannel = (channelData: IChannelData): ThunkAction<void, IRootState, void, Action> =>
  async (dispatch: ThunkDispatch<IRootState, void, Action>, getState: () => IRootState) => {
  const tempId = uuid();
  try {
    dispatch({
      type: SLEK_ADD_CHANNEL,
      payload: {
        channelData,
        tempId
      }
    });
    const auth = getState().chat.auth.content;
    if (!auth) {
      dispatch(addChannelFailure(tempId));
      dispatch(push('/login'));
      return;
    }
    const channel = await api.addChannel(channelData, auth.token);
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

export const removeChannel = (channelId: Uuid): ThunkAction<void, IRootState, void, Action> =>
  async (dispatch: ThunkDispatch<IRootState, void, Action>, getState: () => IRootState) => {
  try {
    dispatch({
      type: SLEK_REMOVE_CHANNEL,
      payload: channelId
    });
    const auth = getState().chat.auth.content;
    if (!auth) {
      dispatch(removeChannelFailure());
      dispatch(push('/login'));
      return;
    }
    await api.removeChannel(channelId, auth.token);
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

export const channelsMounted = (): ThunkAction<void, IRootState, void, Action> =>
  async (dispatch: ThunkDispatch<IRootState, void, Action>, getState: () => IRootState) => {
  try {
    dispatch({
      type: SLEK_CHANNELS_MOUNTED
    });
    const auth = getState().chat.auth.content;
    if (!auth) {
      dispatch(getChannelsFailure());
      dispatch(push('/login'));
      return;
    }
    const channels = await api.getChannels(auth.token);
    dispatch(getChannelsSuccess(channels));
  } catch (e) {
    dispatch(getChannelsFailure());
  }
};
