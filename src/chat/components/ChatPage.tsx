import * as React from 'react';
import {ChatLayout} from './ChatLayout';
import {Header} from './Header';
import {InputBox} from './InputBox';
import {Messages} from './Messages';
import {ChannelsContainer} from '../containers/Channels';
import {state} from './state';

export class ChatPage extends React.PureComponent {
  render(): JSX.Element {
    return (
      <ChatLayout header={<Header account={state.account.content}/>} sidebar={<ChannelsContainer/>} content={<Messages/>} footer={<InputBox/>}/>
    );
  }
}
