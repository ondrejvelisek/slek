import * as React from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt // , faPowerOff, faUser
} from '@fortawesome/free-solid-svg-icons';

import '../../less/chat/Header.less';
import {ActiveAccountContainer} from '../../containers/chat/ActiveAccount';
import {ILoadable} from '../../states/common/ILoadable';
// import {NavLink} from 'react-router-dom';

export interface IHeaderProps extends ILoadable<string|null> {}

export interface IHeaderActions {}

interface IState {
  readonly accountDropdownOpen: boolean;
}

type IProps = IHeaderProps & IHeaderActions;

export class Header extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accountDropdownOpen: false,
    };
  }

  render(): JSX.Element {
    const { isLoading, error, content: email } = this.props;
    return (
      <Navbar className="header text-light">

        <NavbarBrand>
          <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
          <span> Slek</span>
        </NavbarBrand>

        <Nav right="true" navbar>
          <NavItem>
            {
              email && !isLoading && !error ? (
                <ActiveAccountContainer email={email}/>
              ) : (
                <Button>Sign in</Button>
              )
            }
          </NavItem>
        </Nav>

      </Navbar>
    );
  }
}
