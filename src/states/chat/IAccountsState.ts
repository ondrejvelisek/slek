import * as Immutable from 'immutable';
import {ILoadable} from '../common/ILoadable';
import {IAccount} from '../../models/chat/IAccount';

export interface IAccountsState extends ILoadable<Immutable.Map<string, ILoadable<IAccount>>> {}
