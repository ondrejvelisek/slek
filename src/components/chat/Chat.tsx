import * as React from 'react';
import {ChannelsContainer} from '../../containers/chat/Channels';
import '../../less/chat/Layout.less';
import {HeaderContainer} from '../../containers/chat/Header';
import {MessagesContainer} from '../../containers/chat/Messages';
import {ChannelHeaderContainer} from '../../containers/chat/ChannelHeader';
import {InputBoxContainer} from '../../containers/chat/InputBox';
import {ProtectedContainer} from '../../containers/chat/Protected';

export interface IChatProps {
  channelId: Uuid|null;
}

export class Chat extends React.PureComponent<IChatProps> {

  renderContent = (): JSX.Element => {
    return (
      <div className="flex-grow-1 d-flex flex-column flex-md-row">

        <div className="sidebar">
          <ChannelsContainer/>
        </div>
        {
          this.props.channelId ? (
            <div className="d-flex flex-grow-1 flex-column">

              <div className="content-header">
                <ChannelHeaderContainer/>
              </div>

              <div className="content flex-grow-1">
                <MessagesContainer/>
              </div>

              <div className="footer">
                <InputBoxContainer/>
              </div>

            </div>
          ) : (
            <div className="empty d-flex flex-grow-1 flex-column">
              Select channel
            </div>
          )
        }
      </div>
    );
  };
  render(): JSX.Element {
    return (
      <div className="h-100 d-flex flex-column">
        <ProtectedContainer>

          <div className="header">
            <HeaderContainer/>
          </div>

          {this.renderContent()}

        </ProtectedContainer>
      </div>
    );
  }
}
