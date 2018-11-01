import {IChannel} from '../models/chat/IChannel';
import {SLEK_APP_ID, SLEK_TOKEN} from '../constants/api';
import * as Immutable from 'immutable';
import * as fetch from './fetch';
import {IChannelData} from '../models/chat/IChannelData';

export const getChannels = async (): Promise<Immutable.List<IChannel>> =>
  Immutable.List(await fetch.get<IChannel[]>(`/app/${SLEK_APP_ID}/channel`, SLEK_TOKEN));


export const addChannel = async (channel: IChannelData): Promise<IChannel> =>
  await fetch.post<IChannel>(`/app/${SLEK_APP_ID}/channel`, channel, SLEK_TOKEN);

export const removeChannel = async (channelId: Uuid): Promise<void> =>
  await fetch.del(`/app/${SLEK_APP_ID}/channel/${channelId}`, null, SLEK_TOKEN);
