import * as Immutable from 'immutable';
import {ILoadable} from '../common/ILoadable';
import {IActivableMap} from '../common/IActivableMap';
import {IAccount} from '../../models/chat/IAccount';

export interface IAccountsState extends IActivableMap<string, ILoadable<IAccount>>, ILoadable<Immutable.Map<string, ILoadable<IAccount>>> {}
