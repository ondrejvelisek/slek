import * as React from 'react';
import {
  Button,
  Modal, ModalBody, ModalFooter, ModalHeader,
  Nav,
  Navbar, NavbarBrand, NavItem
} from 'reactstrap';
import '../../less/chat/ChannelHeader.less';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faEdit, faUsers} from '@fortawesome/free-solid-svg-icons';
import {IChannel} from '../../models/chat/IChannel';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {EditChannel} from './EditChannel';
import {IEditable} from '../../states/common/IEditable';
import {UsersPopupContainer} from '../../containers/chat/UsersPopup';

export interface IChannelHeaderProps extends ILoadable<(IChannel) | null>, IEditable {}

export interface IChannelHeaderActions {
  deleteChannel: (channelId: Uuid) => void;
  updateChannel: (channel: IChannel, newName: string) => void;
  startEditingChannel: (channelId: Uuid) => void;
  cancelEditingChannel: (channelId: Uuid) => void;
}

interface IChannelHeaderState {
  showUsersModal: boolean;
}

export class ChannelHeader extends React.PureComponent<IChannelHeaderProps & IChannelHeaderActions, IChannelHeaderState> {
  constructor(props: IChannelHeaderProps & IChannelHeaderActions) {
    super(props);
    this.state = {
      showUsersModal: false
    };
  }

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

  toggleUsersModal = () => {
    const {content: channel} = this.props;
    if (channel) {
      const {showUsersModal} = this.state;
      this.setState({
        showUsersModal: !showUsersModal
      });
    }
  };

  getChannelHeader = (channel: IChannel): JSX.Element => {
    return (
      <div className="navbar-div">
        <NavbarBrand>
          <span>{channel.name}</span>
        </NavbarBrand>
        <Nav right="true" navbar className="nav-button">
          <NavItem onClick={this.toggleUsersModal} className="clickable">
            <FontAwesomeIcon icon={faUsers}/>
          </NavItem>
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
      <div>
        <Navbar className="channel-header text-light">
          {isEditing && channel && this.getChannelEditHeader(channel)}
          {!isEditing && channel && (this.getChannelHeader(channel))}
          {isLoading && (
            <Loader/>
          )}
        </Navbar>
        <Modal isOpen={this.state.showUsersModal} toggle={this.toggleUsersModal} backdrop={true}>
          <ModalHeader>Add users</ModalHeader>
          <ModalBody>
            <UsersPopupContainer/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleUsersModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
