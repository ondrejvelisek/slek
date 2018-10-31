import * as React from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt, faPowerOff, faUser // , faPowerOff, faUser
} from '@fortawesome/free-solid-svg-icons';

import '../../less/chat/Header.less';
import {IAccount} from '../../models/chat/IAccount';
import {ILoadable} from '../../states/common/ILoadable';
import {AvatarContainer} from '../../containers/chat/Avatar';
import {IHasId} from '../../models/chat/IHasId';

export interface IHeaderProps extends ILoadable<(IAccount & IHasId) | null> {}

export interface IHeaderActions {}

interface IState {
  readonly accountDropdownOpen: boolean;
}

export class Header extends React.PureComponent<IHeaderProps & IHeaderActions, IState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      accountDropdownOpen: false
    };
  }

  toggleAccountDropdown = () => {
    this.setState((prevState: IState) => ({
      ...prevState,
      accountDropdownOpen: !prevState.accountDropdownOpen
    }));
  };

  renderAccount = (props: IHeaderProps): JSX.Element => {
    const { isLoading, error, content: account } = props;
    const { accountDropdownOpen } = this.state;
    if (!isLoading && !error && account) {
      return (
        <NavItem>
          <Dropdown className="account-dropdown" isOpen={accountDropdownOpen} toggle={this.toggleAccountDropdown}>

            <DropdownToggle tag="div" className="toggler">
              <AvatarContainer id={account.id} className="clickable"/>
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem header>{account.name}</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <FontAwesomeIcon icon={faUser}/>
                <span> Edit profile</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <FontAwesomeIcon icon={faPowerOff}/>
                <span> Logout</span>
              </DropdownItem>
            </DropdownMenu>

          </Dropdown>
        </NavItem>
      );
    } else if (isLoading) {
      return (
        <NavItem>Account is loading</NavItem>
      );
    } else {
      return (
        <NavItem>Error loading account</NavItem>
      );
    }
  };

  render(): JSX.Element {
    return (
      <Navbar className="header text-light">

        <NavbarBrand>
          <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
          <span> Slek</span>
        </NavbarBrand>

        <Nav right="true" navbar>
          {this.renderAccount(this.props)}
        </Nav>

      </Navbar>
    );
  }
}
