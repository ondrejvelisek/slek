import * as React from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {AvatarContainer} from '../../containers/chat/Avatar';
import {HeaderContainer} from '../../containers/chat/Header';
import {ProtectedContainer} from '../../containers/chat/Protected';
import {IAccount} from '../../models/chat/IAccount';
import '../../less/chat/Layout.less';
import '../../less/chat/Profile.less';
import {Redirect} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

export interface IProfileProps extends ILoadable<IAccount | null> {}

export interface IProfileStateProps extends IAccount {
  showAvatarModal: boolean;
}

export interface IProfileActions {
  updateAccount: (user: IAccount) => void;
}

export class Profile extends React.PureComponent<IProfileProps & IProfileActions, IProfileStateProps> {
  constructor(props: IProfileProps & IProfileActions) {
    super(props);
    if (props.content) {
      const { name, email, avatar} = props.content;
      this.state = {
        name,
        email,
        avatar,
        showAvatarModal: false
      };
    }
  }

  private onSave = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.updateAccount(this.state);
    this.setState(_ => ({
      name: '',
      email: '',
      avatar: ''
    }));
  };

  private onNameChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: name } = event.currentTarget;
    console.log(name);
    this.setState(() => ({ name }));
    console.log(this.state);
  };

  private onEmailChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: email } = event.currentTarget;
    console.log(email);
    this.setState(() => ({ email }));
    console.log(this.state);
  };

  private onAvatarChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: avatar } = event.currentTarget;
    console.log(avatar);
    this.setState(() => ({ avatar }));
    console.log(this.state);
  };

  private updateAvatar = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.updateAccount(this.state);
    this.setState(_ => ({
      avatar: ''
    }));
    this.toggleAvatarModal();
  };

  private toggleAvatarModal = () => {
    const {content: channel} = this.props;
    if (channel) {
      const {showAvatarModal} = this.state;
      this.setState(() => ({
        showAvatarModal: !showAvatarModal
      }));
    }
  };

  render(): JSX.Element {
    const {content: account, isLoading} = this.props;
    if (!account) {
      if (isLoading) {
        return (
          <Loader/>
        );
      }
      return <Redirect to="/login"/>;
    }
    const {avatar} = this.state;
    return (
      <div className="h-100 d-flex flex-column">

        <div className="header">
          <HeaderContainer/>
        </div>

        <ProtectedContainer>
          <div className="profile flex-grow-1 d-flex flex-column flex-md-row">
            <Form onSubmit={this.onSave}>
              <FormGroup>
                <div className="avatar-container">
                  <AvatarContainer email={account.email} className="avatar-container"/>
                  <span className="upload" onClick={this.toggleAvatarModal}>
                    <FontAwesomeIcon icon={faEdit}/>
                    Upload new avatar
                  </span>
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="accountUserName">Name:</Label>
                <Input type="text" name="username" id="accountUserName" placeholder="username" value={this.state.name} onChange={this.onNameChanged}/>
              </FormGroup>
              <FormGroup>
                <Label for="accountUserEmail">Email:</Label>
                <Input type="text" name="email" id="accountUserEmail" placeholder="email" value={this.state.email} onChange={this.onEmailChanged}/>
              </FormGroup>
              <Button type="submit" className="btn btn-success">Submit</Button>
            </Form>
          </div>
        </ProtectedContainer>

        <Modal isOpen={this.state.showAvatarModal} toggle={this.toggleAvatarModal} backdrop={true}>
          <ModalHeader>Change avatar</ModalHeader>
          <ModalBody>
            <Label for="accountUserAvatar">Avatar url:</Label>
            <Input type="text" name="avatar" id="accountUserAvatar" placeholder="avatar" value={avatar ? avatar : ''} onChange={this.onAvatarChanged}/>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" onClick={this.updateAvatar}>Submit</Button>
            <Button color="secondary" onClick={this.toggleAvatarModal}>Close</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}
