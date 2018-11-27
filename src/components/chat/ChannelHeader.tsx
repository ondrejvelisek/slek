import * as React from 'react';
import {
  Nav,
  Navbar, NavbarBrand, NavItem
} from 'reactstrap';
import '../../less/chat/ChannelHeader.less';
import {IChannel} from '../../models/chat/IChannel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';

export interface IChannelHeaderProps extends ILoadable<(IChannel) | null> {}

export interface IChannelHeaderOwnProps {}

export interface IChannelHeaderActions {
  deleteChannel: (channelId: Uuid) => void;
}

export class ChannelHeader extends React.PureComponent<IChannelHeaderProps & IChannelHeaderOwnProps & IChannelHeaderActions> {

  removeChannel = () => {
    if (this.props.content) {
      this.props.deleteChannel(this.props.content.id);
    }
  };

  render(): JSX.Element {
    const { isLoading, content: channel } = this.props;
    return (
      <Navbar className="channel-header text-light">
        {channel && (
          <NavbarBrand>
            <span>{channel.name}</span>
          </NavbarBrand>
        )}
        {channel && (
          <Nav right="true" navbar>
            <NavItem onClick={this.removeChannel} className="clickable">
              <FontAwesomeIcon icon={faTrash}/>
            </NavItem>
          </Nav>
        )}
        {isLoading && (
          <Loader/>
        )}
      </Navbar>
    );
  }
}
