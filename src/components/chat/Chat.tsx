import * as React from 'react';
import {InputBox} from './InputBox';
import {ChannelsContainer} from '../../containers/chat/Channels';
import '../../less/chat/Layout.less';
import {HeaderContainer} from '../../containers/chat/Header';
import {MessagesContainer} from '../../containers/chat/Messages';
import {ChannelHeaderContainer} from '../../containers/chat/ChannelHeader';
import {Redirect} from 'react-router-dom';
import {IChatState} from '../../states/chat/IChatState';
import {IAuthData} from '../../models/chat/IAuthData';
import {ILoadable} from '../../states/common/ILoadable';

export interface IChatProps extends ILoadable<IAuthData | null> {}

export class Chat extends React.PureComponent<IChatProps, IChatState> {
  renderContent = (): JSX.Element => {
    return (
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
    );
  };
  render(): JSX.Element {
    const { content: auth } = this.props;
    if (!auth || Date.parse(auth.expiration) < Date.now()) {
      return (
        <Redirect to="/login"/>
      );
    }
    return (

      <div className="h-100 d-flex flex-column">

        <div className="header">
          <HeaderContainer/>
        </div>

        {this.renderContent()}

      </div>
    );
  }
}
