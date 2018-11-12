import * as React from 'react';
import '../../less/chat/Login.less';
import '../../less/chat/Layout.less';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import {IAuthData} from '../../models/chat/IAuthData';
import {Redirect} from 'react-router-dom';
import {HeaderContainer} from '../../containers/chat/Header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';

export interface ILoginProps extends IAuthData {}

export  interface ILoginOwnProps {
  readonly email: string;
  readonly password: string;
}

export interface ILoginActions {
  readonly login: (loginData: ILoginOwnProps) => void;
}

type IProps = ILoginProps & ILoginActions;

export class Login extends React.PureComponent<IProps, ILoginOwnProps> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState(_ => ({ email: value }));
  };

  onPasswordChanged = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    this.setState(_ => ({ password: value }));
  };

  private onLogin = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.login(this.state);
  };

  render(): JSX.Element {
    const {token} = this.props;
    if (token.length > 0) {
      return (
        <Redirect to="/"/>
      );
    }
    return (
      <div className="h-100 d-flex flex-column login">

        <div className="header">
          <HeaderContainer token={token}/>
        </div>

        <div className="login-header">
          <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
        </div>

        <Form className="login-content" onSubmit={this.onLogin}>
          <FormGroup>
            <Input type="text" name="name" id="accountName" placeholder="email" tooltip="Email"
                   value={this.state.email} onChange={this.onEmailChanged}/>
          </FormGroup>
          <FormGroup>
            <Input type="text" name="username" id="accountUsername" placeholder="password" tooltip="Password"
                   value={this.state.password} onChange={this.onPasswordChanged}/>
          </FormGroup>
          <Button type="submit" className="btn btn-primary">Login</Button>
        </Form>

      </div>
    );
  }
}
