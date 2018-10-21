import { IState } from './IState';
import {chat} from '../chat/reducers/chat';

export const rootReducer = (prevState = {} as IState, action: Action): IState => ({
  chat: chat(prevState.chat, action),
});
