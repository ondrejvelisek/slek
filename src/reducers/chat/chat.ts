import {combineReducers} from 'redux';
import {channels} from './channels';
import {accounts} from './accounts';
import {messages} from './messages';
import {IChatState} from '../../states/chat/IChatState';

export const chat = combineReducers<IChatState, Action>({
  channels, accounts, messages
});
