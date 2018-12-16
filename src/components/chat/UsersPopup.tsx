import * as React from 'react';
import {ILoadable} from '../../states/common/ILoadable';
import * as Immutable from 'immutable';
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import {Loader} from './Loader';
import '../../less/chat/Channels.less';
import {ChangeEvent} from 'react';
import {IChannel} from '../../models/chat/IChannel';
import {IChannelHeaderProps} from './ChannelHeader';

export interface IUserPopupProps extends ILoadable<Immutable.List<Uuid>> {
  channel: IChannelHeaderProps;
}

export interface IUserPopupActions {
  onMounted: () => void;
  channelSubscribeUser: (channel: IChannel, userEmail: string) => void;
  channelUnsubscribeUser: (channel: IChannel, userEmail: string) => void;
}

export class UsersPopup extends React.PureComponent<IUserPopupProps & IUserPopupActions> {
  componentDidMount() {
    this.props.onMounted();
  }

  changeUserSubscription = (event: ChangeEvent<HTMLInputElement>) => {
    const { content: channel } = this.props.channel;
    if (channel) {
      if (event.target.checked) {
        this.props.channelSubscribeUser(channel, event.target.value);
      } else {
        this.props.channelUnsubscribeUser(channel, event.target.value);
      }
    }
  };

  renderList = () => {
    const { content: userEmails, error, isLoading } = this.props;
    if (error) {
      return (
        <span className="clickable">
          <FontAwesomeIcon icon={faExclamationCircle}/>
          <span> Error - Try again</span>
        </span>
      );
    }
    const { content: channel } = this.props.channel;
    // console.log(channel);
    return (
      <div>
        {userEmails.map((userEmail: string) => (
          <span key={userEmail} id={userEmail}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Input addon type="checkbox" checked={channel != null && channel.accountEmails.includes(userEmail)} onChange={this.changeUserSubscription} value={userEmail}/>
              </InputGroupText>
              <strong>{userEmail}</strong>
            </InputGroupAddon>
          </span>
        ))}
        {isLoading && (<Loader/>)}
      </div>
    );
  };

  render() {
    this.props.content;
    return (
      <div className="popup">
        <div className="popup_inner">
          <InputGroup>
            {this.renderList()}
          </InputGroup>
        </div>
      </div>
    );
  }
}
