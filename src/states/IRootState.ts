import {IChatState} from './chat/IChatState';
import {RouterState} from 'connected-react-router';

export interface IRootState {
  router: RouterState;
  chat: IChatState;
}
