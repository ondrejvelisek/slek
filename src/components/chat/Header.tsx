import * as React from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt // , faPowerOff, faUser
} from '@fortawesome/free-solid-svg-icons';

import '../../less/chat/Header.less';
import {ActiveAccountContainer} from '../../containers/chat/ActiveAccount';
// import {NavLink} from 'react-router-dom';

export interface IHeaderProps {
  activeAccountEmail: string|null;
}

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
    return (
      <Navbar className="header text-light">

        <NavbarBrand>
          <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
          <span> Slek</span>
        </NavbarBrand>

        <Nav right="true" navbar>
          <NavItem>
            {
              this.props.activeAccountEmail ? (
                <ActiveAccountContainer email={this.props.activeAccountEmail}/>
              ) : (
                <button>Sign in</button>
              )
            }
          </NavItem>
        </Nav>

      </Navbar>
    );
  }
}
