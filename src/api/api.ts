import {IChannel} from '../models/chat/IChannel';
import {SLEK_APP_ID} from '../constants/api';
import * as Immutable from 'immutable';
import * as fetch from './fetch';
import {IChannelData} from '../models/chat/IChannelData';
import {ILoginOwnProps} from '../components/chat/Login';
import {IAuthData} from '../models/chat/IAuthData';

export const login = async (loginData: ILoginOwnProps): Promise<IAuthData> =>
  await fetch.post<IAuthData>(`/auth`, loginData, null, 'text/plain');

export const getChannels = async (token: string): Promise<Immutable.List<IChannel>> =>
  Immutable.List(await fetch.get<IChannel[]>(`/app/${SLEK_APP_ID}/channel`, token));


export const addChannel = async (channel: IChannelData, token: string): Promise<IChannel> =>
  await fetch.post<IChannel>(`/app/${SLEK_APP_ID}/channel`, channel, token, 'application/json');

export const removeChannel = async (channelId: Uuid, token: string): Promise<void> =>
  await fetch.del(`/app/${SLEK_APP_ID}/channel/${channelId}`, null, token);
