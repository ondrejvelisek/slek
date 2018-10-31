import {chat} from './chat/chat';
import {combineReducers} from 'redux';
import {IRootState} from '../states/IRootState';

export const rootReducer = combineReducers<IRootState, Action>({
  chat
});
