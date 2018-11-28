import * as React from 'react';
import {
  Dropdown, DropdownMenu, DropdownItem, DropdownToggle
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPowerOff, faUser // , faPowerOff, faUser
} from '@fortawesome/free-solid-svg-icons';

import '../../less/chat/Header.less';
import {IAccount} from '../../models/chat/IAccount';
import {ILoadable} from '../../states/common/ILoadable';
import {AvatarContainer} from '../../containers/chat/Avatar';
// import {NavLink} from 'react-router-dom';

export interface IActiveAccountProps extends ILoadable<IAccount|null> {
  email: string;
}

export interface IActiveAccountActions {
  onMount: (email: string) => void;
  logout: () => void;
}

interface IState {
  readonly accountDropdownOpen: boolean;
}

type IProps = IActiveAccountProps & IActiveAccountActions;

export class ActiveAccount extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accountDropdownOpen: false,
    };
  }

  componentDidMount() {
    this.props.onMount(this.props.email);
  }

  toggleAccountDropdown = () => {
    this.setState((prevState: IState) => ({
      ...prevState,
      accountDropdownOpen: !prevState.accountDropdownOpen
    }));
  };

  onLogoutHandler = () => {
    this.props.logout();
  };

  render(): JSX.Element {
    const { accountDropdownOpen } = this.state;
    const { isLoading, error, content: account } = this.props;
    if (isLoading) {
      return <span>Account loading</span>;
    } else if (error || !account) {
      return <span>Error</span>;
    } else {
      return (
        <Dropdown className="account-dropdown" isOpen={accountDropdownOpen} toggle={this.toggleAccountDropdown}>

          <DropdownToggle tag="div" className="toggler">
            <AvatarContainer email={account.email} className="clickable"/>
          </DropdownToggle>

          <DropdownMenu>
            <DropdownItem header>{account.name}</DropdownItem>
            <DropdownItem divider />
            {/*<NavLink to={`/profile/${this.props.token}`}>*/}
            <DropdownItem>
              <FontAwesomeIcon icon={faUser}/>
              <span> Edit profile</span>
            </DropdownItem>
            {/*</NavLink>*/}
            <DropdownItem divider />
            <DropdownItem onClick={this.onLogoutHandler}>
              <FontAwesomeIcon icon={faPowerOff}/>
              <span> Logout</span>
            </DropdownItem>
          </DropdownMenu>

        </Dropdown>
      );
    }
  }
}
