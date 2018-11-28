import {IChannel} from '../models/chat/IChannel';
import {API_URL, SLEK_APP_ID} from '../constants/api';
import {IChannelData} from '../models/chat/IChannelData';
import {
  withArtificialError,
  withDelay,
  withErrorHandler,
  withAuth,
  withJsonBody,
  post, put, del,
  Fetch, withRebasedUrl
} from './fetchDecorators';
import {List} from 'immutable';
import {IAccount} from '../models/chat/IAccount';
import {IMessageData} from '../models/chat/IMessageData';
import {IMessage} from '../models/chat/IMessage';
import * as _ from 'lodash';
import {IAppData} from '../models/chat/IAppData';
import {IFileData} from '../models/chat/IFileData';
import {IFileMetadata} from '../models/chat/IFileMetadata';
import {identityParser, Parser, withoutResp, parseResp} from './fetchParsers';
import {IAuthData} from '../models/chat/IAuthData';
import {ICredentials} from '../models/chat/ICredentials';
import {IAuth} from '../models/chat/IAuth';

export interface IChatService {
  getApp: () => Promise<IAppData>;
  updateApp: (app: IAppData) => Promise<IAppData>;

  login: (credentials: ICredentials) => Promise<IAuthData>;

  getChannels: () => Promise<List<IChannel>>;
  getChannel: (channelId: Uuid) => Promise<IChannel>;
  createChannel: (channel: IChannelData) => Promise<IChannel>;
  updateChannel: (channel: IChannel) => Promise<IChannel>;
  deleteChannel: (channelId: Uuid) => Promise<void>;

  getFile: (fileId: Uuid) => Promise<IFileMetadata>;
  getFileLink: (fileId: Uuid) => Promise<string>;
  uploadFile: (file: IFileData) => Promise<IFileMetadata>;

  getMessages: (channelId: Uuid, lastN?: number) => Promise<List<IMessage>>;
  createMessage: (channelId: Uuid, messageData: IMessageData) => Promise<IMessage>;
  updateMessage: (channelId: Uuid, message: IMessage) => Promise<IMessage>;
  deleteMessage: (channelId: Uuid, messageId: Uuid) => Promise<void>;

  getUsers: () => Promise<List<IAccount>>;
  getUser: (email: string) => Promise<IAccount>;
  createUser: (user: IAccount) => Promise<IAccount>;
  updateUser: (user: IAccount) => Promise<IAccount>;
}

export type GetAuth = () => IAuth|null;

const withApp = (app: IAppData) => withJsonBody({customdata: app});
const withCredentials = (credentials: ICredentials) => withJsonBody(credentials);
const withChannel = (channel: IChannelData) => withJsonBody({name: channel.name, customdata: channel});
const withFile = (file: IFileData) => withJsonBody(file); // TODO
const withMessage = (message: IMessageData) => withJsonBody({value: message.value, customdata: message});
const withAccount = (account: IAccount) => withJsonBody({email: account.email, customdata: account});

const customDataParser: Parser<any> = resp => ({...resp.customData, ...resp});
const listParser = <R>(itemParser: Parser<R>): Parser<List<R>> => resp => List<R>(resp.map(itemParser));

const appParser: Parser<IAppData> = customDataParser;
const authParser: Parser<IAuth> = identityParser;
const channelParser: Parser<IChannel> = customDataParser;
const channelListParser: Parser<List<IChannel>> = listParser(channelParser);
const fileMetadataParser: Parser<IFileMetadata> = identityParser;
const fileLinkParser: Parser<string> = resp => resp.fileUri;
const messageParser: Parser<IMessage> = customDataParser;
const messageListParser: Parser<List<IMessage>> = listParser(messageParser);
const accountParser: Parser<IAccount> = customDataParser;
const accountListParser: Parser<List<IAccount>> = listParser(accountParser);

export const createChatService = (getAuth: GetAuth): IChatService => {

  const delay = 1000;
  const errorProb = 0.0;

  const apiFetch = _.flowRight(
    withRebasedUrl(API_URL),
    withErrorHandler()
  )(fetch);

  const appFetch: Fetch = _.flowRight(
    withRebasedUrl(`${API_URL}/app/${SLEK_APP_ID}`),
    withErrorHandler(),
    withAuth(getAuth),
    withArtificialError(errorProb),
    withDelay(delay)
  )(fetch);

  const app2Fetch: Fetch = _.flowRight(
    withRebasedUrl(`${API_URL}/${SLEK_APP_ID}`),
    withErrorHandler(),
    withAuth(getAuth),
    withArtificialError(errorProb),
    withDelay(delay)
  )(fetch);

  return {
    getApp: () => parseResp(appParser)(appFetch)(''),
    updateApp: (app: IAppData) => parseResp(appParser)(withApp(app)(appFetch))('', {method: 'PUT'}),

    login: (credentials: ICredentials) => parseResp(authParser)(post(withCredentials(credentials)(apiFetch)))('/auth'),

    getChannels: () => parseResp(channelListParser)(appFetch)('/channel'),
    getChannel: (channelId: Uuid) => parseResp(channelParser)(appFetch)(`/channel/${channelId}`),
    createChannel: (channel: IChannelData) => parseResp(channelParser)(post(withChannel(channel)(appFetch)))('/channel'),
    updateChannel: (channel: IChannel) => parseResp(channelParser)(put(withChannel(channel)(appFetch)))(`/channel/${channel.id}`),
    deleteChannel: (channelId: Uuid) => withoutResp(del(appFetch))(`/channel/${channelId}`),

    getFile: (fileId: Uuid) => parseResp(fileMetadataParser)(appFetch)(`/file/${fileId}`),
    getFileLink: (fileId: Uuid) => parseResp(fileLinkParser)(appFetch)(`/file/${fileId}/download-link`),
    uploadFile: (file: IFileData) => parseResp(fileMetadataParser)(post(withFile(file)(appFetch)))('/file'),

    getMessages: (channelId: Uuid, lastN?: number) =>
      parseResp(messageListParser)(appFetch)(`/channel/${channelId}/message?lastN=${lastN}`),
    createMessage: (channelId: Uuid, message: IMessageData) =>
      parseResp(messageParser)(post(withMessage(message)(appFetch)))(`/channel/${channelId}/message`),
    updateMessage: (channelId: Uuid, message: IMessage) =>
      parseResp(messageParser)(put(withMessage(message)(appFetch)))(`/channel/${channelId}/message/${message.id}`),
    deleteMessage: (channelId: Uuid, messageId: Uuid) =>
      withoutResp(del(appFetch))(`/channel/${channelId}/message/${messageId}`),

    getUsers: () => parseResp(accountListParser)(app2Fetch)('/user'),
    getUser: (email: string) => parseResp(accountParser)(app2Fetch)(`/user/${email}`),
    createUser: (user: IAccount) => parseResp(accountParser)(post(withAccount(user)(app2Fetch)))('/user'),
    updateUser: (user: IAccount) => parseResp(accountParser)(put(withAccount(user)(app2Fetch)))(`/user/${user.email}`)
  };
};
