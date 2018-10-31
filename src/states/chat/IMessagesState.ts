import * as Immutable from 'immutable';
import {ILoadable} from '../common/ILoadable';
import {IMessage} from '../../models/chat/IMessage';

export interface IMessagesState extends ILoadable<Immutable.Map<Uuid, IMessage>> {}
