import React from 'react';

import ChatLayout from './ChatLayout';
import Header from "./Header";
import Channels from "./Channels";
import Messages from "./Messages";
import InputBox from "./InputBox";

import '../less/ChatPage.less';

export default class ChatPage extends React.PureComponent {
  render() {
    return (
      <ChatLayout header={<Header/>} sidebar={<Channels/>} content={<Messages/>} footer={<InputBox/>}/>
    );
  }
}
