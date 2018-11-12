import * as React from 'react';
import {HeaderContainer} from '../../containers/chat/Header';
import {IAccount} from '../../models/chat/IAccount';
import '../../less/chat/Layout.less';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {AvatarContainer} from '../../containers/chat/Avatar';
import {IAuthData} from '../../models/chat/IAuthData';

export interface IProfileProps extends ILoadable<IAccount | null> {}

export interface IProfileOwnProps extends IAuthData {}

export interface IProfileActions {}

export class Profile extends React.PureComponent<IProfileProps & IProfileActions & IProfileOwnProps> {
  render(): JSX.Element {
    const {content: account} = this.props;
    if (!account) {
      return (
        <Loader/>
      );
    }
    return (
      <div className="h-100 d-flex flex-column">
        <div className="header">
          <HeaderContainer/>
        </div>
        <Form className="info-content">
          <FormGroup>
            <AvatarContainer id={account.id} className="avatar profile-picture"/>
          </FormGroup>
          <FormGroup>
            <Label for="accountUsername">Name</Label>
            <Input type="text" name="username" id="accountUsername" placeholder="username" value={account.name} />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
