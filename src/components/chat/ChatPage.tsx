import * as React from 'react';
import {InputBox} from './InputBox';
import {ChannelsContainer} from '../../containers/chat/Channels';
import { IAccount } from '../../models/chat/IAccount';
import '../../less/chat/ChatPage.less';
import {HeaderContainer} from '../../containers/chat/Header';
import {MessagesContainer} from '../../containers/chat/Messages';
import {ChannelHeaderContainer} from '../../containers/chat/ChannelHeader';

export class ChatPage extends React.PureComponent {
  constructor(props: IAccount) {
    super(props);
  }
  render(): JSX.Element {
    return (

      <div className="h-100 d-flex flex-column">

        <div className="header">
          <HeaderContainer/>
        </div>

        <div className="flex-grow-1 d-flex flex-column flex-md-row">

          <div className="sidebar">
            <ChannelsContainer/>
          </div>

          <div className="d-flex flex-grow-1 flex-column">

            <div className="content-header">
              <ChannelHeaderContainer/>
            </div>

            <div className="content flex-grow-1">
              <MessagesContainer/>
            </div>

            <div className="footer">
              <InputBox/>
            </div>

          </div>

        </div>

      </div>
    );
  }
}
