import React from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, Dropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt, faPowerOff, faUser
} from '@fortawesome/free-solid-svg-icons';
import Avatar from "./Avatar";
import state from './state';

import '../less/Header.less';

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      accountDropdownOpen: false
    };
  }

  toggleAccountDropdown = () => {
    this.setState(prevState => ({
      ...prevState,
      accountDropdownOpen: !prevState.accountDropdownOpen
    }));
  };

  render() {
    const { name, avatar } = state.account.content;
    const { accountDropdownOpen } = this.state;
    return (
      <Navbar className="header text-light">

          <NavbarBrand>
            <FontAwesomeIcon icon={faCommentAlt} className="text-warning"/>
            <span> Slek</span>
          </NavbarBrand>

          <Nav right="true" navbar>
            <NavItem>
              <Dropdown className="account-dropdown" isOpen={accountDropdownOpen} toggle={this.toggleAccountDropdown}>

                <DropdownToggle tag="div" className="toggler">
                  <Avatar image={avatar} className="clickable"/>
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem header>{name}</DropdownItem>
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
          </Nav>

      </Navbar>
    );
  }
}
