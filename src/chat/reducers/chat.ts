import { channels } from './channels';
import { IChatApp } from '../models/IChat';

export const chat = (prevState = {} as IChatApp, action: Action): IChatApp => ({
  channels: channels(prevState.channels, action),
});
