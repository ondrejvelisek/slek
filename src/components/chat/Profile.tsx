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
import {IAccountData} from '../../models/chat/IAccountData';
import {Redirect} from 'react-router';

export interface IProfileProps extends ILoadable<IAccount | null> {}

interface IProfileStateProps extends IAccount, IAccountData {
}

export interface IProfileActions {}

export class Profile extends React.PureComponent<IProfileProps & IProfileActions, IProfileStateProps> {
  constructor(props: IProfileProps & IProfileActions) {
    super(props);
    if (props.content) {
      const { name, email} = props.content;
      this.state = {
        name,
        email,
        avatar: props.content.avatar
      };
    }
  }

  private onSave = (event: React.FormEvent) => {
    event.preventDefault();


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

  render(): JSX.Element {
    const {content: account, isLoading} = this.props;
    console.log(this.state);
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
              <FormGroup>
                <AvatarContainer email={account.email} className="avatar profile-picture"/>
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
