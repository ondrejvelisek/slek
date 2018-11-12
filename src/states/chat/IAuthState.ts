import {ILoadable} from '../common/ILoadable';
import {IAuthData} from '../../models/chat/IAuthData';

export interface IAuthState extends ILoadable<IAuthData|null> {}
