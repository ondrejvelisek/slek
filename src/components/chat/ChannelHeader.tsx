import * as React from 'react';
import {
  Nav,
  Navbar, NavbarBrand, NavItem
} from 'reactstrap';
import '../../less/chat/ChannelHeader.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import {IChannel} from '../../models/chat/IChannel';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {EditChannel} from './EditChannel';
import {IEditable} from '../../states/common/IEditable';

export interface IChannelHeaderProps extends ILoadable<(IChannel) | null>, IEditable {}

export interface IChannelHeaderOwnProps {}

export interface IChannelHeaderActions {
  deleteChannel: (channelId: Uuid) => void;
  updateChannel: (channel: IChannel, newName: string) => void;
  startEditingChannel: (channelId: Uuid) => void;
  cancelEditingChannel: (channelId: Uuid) => void;
}

export class ChannelHeader extends React.PureComponent<IChannelHeaderProps & IChannelHeaderOwnProps & IChannelHeaderActions> {
  removeChannel = () => {
    const {content: channel} = this.props;
    if (channel) {
      this.props.deleteChannel(channel.id);
    }
  };

  onSave = (newName: string) => {
    const {content: channel} = this.props;
    if (channel) {
      this.props.updateChannel(channel, newName);
    }
  };

  editChannel = (event: React.MouseEvent) => {
    event.preventDefault();
    const {content: channel} = this.props;
    if (channel) {
      this.props.startEditingChannel(channel.id);
    }
  };

  getChannelHeader = (channel: IChannel): JSX.Element => {
    return (
      <div className="navbar-div">
        <NavbarBrand>
          <span>{channel.name}</span>
        </NavbarBrand>
        <Nav right="true" navbar className="nav-button">
          <NavItem onClick={this.editChannel} className="clickable">
            <FontAwesomeIcon icon={faEdit}/>
          </NavItem>
          <NavItem onClick={this.removeChannel} className="clickable">
            <FontAwesomeIcon icon={faTrash}/>
          </NavItem>
        </Nav>
      </div>
    );
  };

  getChannelEditHeader = (channel: IChannel): JSX.Element => {
    return (
      <EditChannel channel={channel} onSave={this.onSave} onCancel={this.props.cancelEditingChannel}/>
    );
  }

  render(): JSX.Element {
    const { isLoading, content: channel, isEditing } = this.props;
    return (
      <Navbar className="channel-header text-light">
        {isEditing && channel && this.getChannelEditHeader(channel)}
        {!isEditing && channel && (this.getChannelHeader(channel))}
        {isLoading && (
          <Loader/>
        )}
      </Navbar>
    );
  }
}
