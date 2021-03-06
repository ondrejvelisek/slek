import * as React from 'react';
import {ChannelsContainer} from '../../containers/chat/Channels';
import '../../less/chat/Layout.less';
import {HeaderContainer} from '../../containers/chat/Header';
import {MessagesContainer} from '../../containers/chat/Messages';
import {ChannelHeaderContainer} from '../../containers/chat/ChannelHeader';
import {ProtectedContainer} from '../../containers/chat/Protected';
import {RichTextEditorContainer} from '../../containers/chat/RichTextEditor';

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

              <div className="rich-text-content flex-grow-1">
                <MessagesContainer/>
              </div>

              <div className="footer">
                <RichTextEditorContainer/>
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

        <div className="header">
          <HeaderContainer/>
        </div>

        <ProtectedContainer>
          {this.renderContent()}
        </ProtectedContainer>

      </div>
    );
  }
}
