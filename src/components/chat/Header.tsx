import * as React from 'react';
import {
  Navbar, NavbarBrand, Nav, NavItem, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt
} from '@fortawesome/free-solid-svg-icons';

import '../../less/chat/Header.less';
import {ActiveAccountContainer} from '../../containers/chat/ActiveAccount';
import {ILoadable} from '../../states/common/ILoadable';

export interface IHeaderProps extends ILoadable<string|null> {}

interface IState {
  accountDropdownOpen: boolean;
}

export class Header extends React.PureComponent<IHeaderProps, IState> {
  constructor(props: IHeaderProps) {
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
