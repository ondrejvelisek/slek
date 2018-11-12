import {chat} from './chat/chat';
import {combineReducers} from 'redux';
import {IRootState} from '../states/IRootState';
import {connectRouter} from 'connected-react-router';

export const createRootReducer = (history: any) => combineReducers<IRootState, Action>({
  router: connectRouter(history),
  chat
});
