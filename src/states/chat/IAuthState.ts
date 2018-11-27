import {ILoadable} from '../common/ILoadable';
import {IAuth} from '../../models/chat/IAuth';

export interface IAuthState extends ILoadable<IAuth|null> {}
