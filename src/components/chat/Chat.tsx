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

export interface IChatProps extends ILoadable<IAuthData> {}

export class Chat extends React.PureComponent<IChatProps, IChatState> {
  renderContent = (): JSX.Element => {
    console.log(this.props);
    return (
      <div className="flex-grow-1 d-flex flex-column flex-md-row">

        <div className="sidebar">
          <ChannelsContainer/>
        </div>

        <div className="d-flex flex-grow-1 flex-column">

          <div className="content-header">
            <ChannelHeaderContainer token={this.props.content.token}/>
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
    const {token, expiration} = this.props.content;
    if (token.length === 0 || Date.parse(expiration).valueOf() < Date.now().valueOf()) {
      return (
        <Redirect to="/login"/>
      );
    }
    return (

      <div className="h-100 d-flex flex-column">

        <div className="header">
          <HeaderContainer token={token}/>
        </div>

        {this.renderContent()}

      </div>
    );
  }
}
