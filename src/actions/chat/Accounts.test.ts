import {getAccounts} from './Accounts';
import {List} from 'immutable';
import {IAccount} from '../../models/chat/IAccount';
import {SLEK_ACCOUNTS_GETTING_FAILED, SLEK_ACCOUNTS_GETTING_STARTED, SLEK_ACCOUNTS_GETTING_SUCCEEDED} from '../../constants/actions';

describe('Accounts Thunks', () => {

  test('getAccounts', async () => {
    const account = {
      email: 'ondrejvelisek@gmail.com',
      name: 'Ondrej Velisek',
      avatar: 'https://a.wattpad.com/cover/105874670-288-k79078.jpg',
      channelOrder: []
    };
    const chatServiceMock = getChatServiceMock();
    chatServiceMock.getUsers.mockReturnValue(List<IAccount>([account]));
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    const dispatchable = getAccounts();
    await dispatchable(dispatchMock, getStateMock, {chatService: chatServiceMock});

    expect(dispatchMock.mock.calls.length).toEqual(2);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: SLEK_ACCOUNTS_GETTING_STARTED,
    });
    expect(dispatchMock).toHaveBeenLastCalledWith({
      type: SLEK_ACCOUNTS_GETTING_SUCCEEDED,
      payload: List<IAccount>([account])
    });

    expect(chatServiceMock.getUsers.mock.calls.length).toEqual(1);
  });

  test('getAccounts failed', async () => {
    const chatServiceMock = getChatServiceMock();
    chatServiceMock.getUsers.mockRejectedValue(new Error('artificial error'));
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    const dispatchable = getAccounts();
    await dispatchable(dispatchMock, getStateMock, {chatService: chatServiceMock});

    expect(dispatchMock.mock.calls.length).toEqual(2);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: SLEK_ACCOUNTS_GETTING_STARTED,
    });
    expect(dispatchMock).toHaveBeenLastCalledWith({
      type: SLEK_ACCOUNTS_GETTING_FAILED
    });

    expect(chatServiceMock.getUsers.mock.calls.length).toEqual(1);
  });

});

const getChatServiceMock = () => ({
  getUsers: jest.fn(),
  getApp: jest.fn(),
  updateApp: jest.fn(),
  login: jest.fn(),
  getChannels: jest.fn(),
  getChannel: jest.fn(),
  createChannel: jest.fn(),
  updateChannel: jest.fn(),
  deleteChannel: jest.fn(),
  getFile: jest.fn(),
  getFileLink: jest.fn(),
  uploadFile: jest.fn(),
  getMessages: jest.fn(),
  createMessage: jest.fn(),
  updateMessage: jest.fn(),
  deleteMessage: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn()
});