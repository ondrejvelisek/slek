import * as React from 'react';
import '../../less/chat/Login.less';
import '../../less/chat/Layout.less';
import {Button, Form, FormFeedback, FormGroup, Input} from 'reactstrap';
import {HeaderContainer} from '../../containers/chat/Header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {ICredentials} from '../../models/chat/ICredentials';
import {IAuth} from '../../models/chat/IAuth';
import {Redirect} from 'react-router';

export interface ILoginProps extends ILoadable<IAuth|null> {}

export  interface ILoginOwnState {
  readonly email: string;
  readonly password: string;
}

export interface ILoginActions {
  readonly login: (credentials: ICredentials) => void;
}

type IProps = ILoginProps & ILoginActions;

export class Login extends React.PureComponent<IProps, ILoginOwnState> {

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
    const { isLoading, error, content: account } = this.props;
    if (account && Date.parse(account.expiration) > Date.now()) {
      return <Redirect to="/"/>;
    }
    return (
      <div className="h-100 d-flex flex-column login">

        <div className="header">
          <HeaderContainer/>
        </div>

        <div className="login-header">
          <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
        </div>

        <Form className="login-content" onSubmit={this.onLogin}>
          <FormGroup>
            <Input type="text" name="name" id="accountName" placeholder="email" tooltip="Email"
                   value={this.state.email} onChange={this.onEmailChanged} autoFocus/>
          </FormGroup>
          <FormGroup>
            <Input type="text" name="username" id="accountUsername" placeholder="password" tooltip="Password"
                   value={this.state.password} onChange={this.onPasswordChanged} invalid={error}/>
            {error && (<FormFeedback >Bad email</FormFeedback>)}
          </FormGroup>
          <Button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>Login</Button>

          {isLoading && (<Loader/>)}
        </Form>

      </div>
    );
  }
}
