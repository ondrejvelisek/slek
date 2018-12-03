import * as Immutable from 'immutable';
import {ILoadable} from '../common/ILoadable';
import {IActivableMap} from '../common/IActivableMap';
import {IChannel} from '../../models/chat/IChannel';
import {IEditable} from '../common/IEditable';

export interface IChannelsState extends IActivableMap<Uuid, ILoadable<IChannel> & IEditable>, ILoadable<Immutable.Map<Uuid, ILoadable<IChannel> & IEditable>> {}
