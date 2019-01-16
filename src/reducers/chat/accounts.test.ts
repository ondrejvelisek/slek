import {accounts} from './accounts';
import * as Immutable from 'immutable';
import {IAccount} from '../../models/chat/IAccount';

describe('Accounts reducer', () => {

  test('action SLEK_ACCOUNTS_GETTING_STARTED', () => {
    const currentState = {
      isLoading: false,
      error: null,
      content: Immutable.Map<string, IAccount>()
    };
    const action = {
      type: 'SLEK_ACCOUNTS_GETTING_STARTED'
    };
    const newState = accounts(currentState, action);
    expect(newState.isLoading).toBeTruthy();
  });

  test('action SLEK_ACCOUNTS_GETTING_SUCCEEDED', () => {
    const currentState = {
      isLoading: false,
      error: null,
      content: Immutable.Map<string, IAccount>()
    };
    const account = {
      email: 'ondrejvelisek@gmail.com',
      name: 'Ondrej Velisek',
      avatar: 'https://a.wattpad.com/cover/105874670-288-k79078.jpg',
      channelOrder: []
    };
    const action = {
      type: 'SLEK_ACCOUNTS_GETTING_SUCCEEDED',
      payload: Immutable.List<IAccount>([account])
    };
    const newState = accounts(currentState, action);
    expect(newState.isLoading).toBeFalsy();
    expect(newState.error).toBeNull();
    expect(newState.content.get('ondrejvelisek@gmail.com')).toEqual(account);
    expect(newState.content.size).toEqual(1);
    expect(newState.content.equals(Immutable.Map<string, IAccount>({'ondrejvelisek@gmail.com': account}))).toBeTruthy();
  });

});
