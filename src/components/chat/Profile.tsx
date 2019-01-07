import * as React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {AvatarContainer} from '../../containers/chat/Avatar';
import {HeaderContainer} from '../../containers/chat/Header';
import {ProtectedContainer} from '../../containers/chat/Protected';
import {IAccount} from '../../models/chat/IAccount';
import '../../less/chat/Layout.less';
import '../../less/chat/Profile.less';
import {Redirect} from 'react-router';

export interface IProfileProps extends ILoadable<IAccount | null> {}

export interface IProfileStateProps extends IAccount {
}

export interface IProfileActions {
  updateAccount: (user: IAccount) => void;
  updateAvatar: (file: File) => void;
}

export class Profile extends React.PureComponent<IProfileProps & IProfileActions, IProfileStateProps> {
  constructor(props: IProfileProps & IProfileActions) {
    super(props);
    if (props.content) {
      const { name, email} = props.content;
      this.state = {
        name,
        email,
        avatar: props.content.avatar,
        channelOrder: props.content.channelOrder
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
    this.setState(_ => ({ name }));
  };

  private onEmailChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value: email } = event.currentTarget;
    this.setState(_ => ({ email }));
  };

  private onAvatarChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.props.updateAvatar(files[0]);
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
    return (
      <div className="h-100 d-flex flex-column">

        <div className="header">
          <HeaderContainer/>
        </div>

        <ProtectedContainer>
          <div className="profile flex-grow-1 d-flex flex-column flex-md-row">

            <Form onSubmit={this.onSave}>

              <FormGroup className="avatar-group">
                <Label for="accountAvatar">
                  <AvatarContainer email={account.email} className="avatar profile-picture"/>
                  <div className="edit">Edit</div>
                </Label>
                <Input type="file" name="username"  id="accountAvatar" onChange={this.onAvatarChanged}/>
              </FormGroup>

              <FormGroup>
                <Label for="accountUserName">Name:</Label>
                <Input type="text" name="username" id="accountUserName" placeholder="username" value={account.name} onChange={this.onNameChanged}/>
              </FormGroup>
              <FormGroup>
                <Label for="accountUserEmail">Email:</Label>
                <Input type="text" name="email" id="accountUserEmail" placeholder="email" value={account.email} onChange={this.onEmailChanged}/>
              </FormGroup>
              <Button type="submit" className="btn btn-success">Submit</Button>
            </Form>
          </div>
        </ProtectedContainer>

      </div>
    );
  }
}
