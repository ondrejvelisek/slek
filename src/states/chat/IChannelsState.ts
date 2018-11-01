import * as Immutable from 'immutable';
import {ILoadable} from '../common/ILoadable';
import {IActivableMap} from '../common/IActivableMap';
import {IChannel} from '../../models/chat/IChannel';

export interface IChannelsState extends IActivableMap<Uuid, ILoadable<IChannel>>, ILoadable<Immutable.Map<Uuid, ILoadable<IChannel>>> {}
