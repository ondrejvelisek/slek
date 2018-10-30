import { IState } from '../states/IState';
import {chat} from './chat/chat';

export const rootReducer = (prevState = {} as IState, action: Action): IState => ({
  chat: chat(prevState.chat, action),
});
