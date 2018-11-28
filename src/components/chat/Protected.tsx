import * as React from 'react';
import '../../less/chat/Message.less';

export interface IProtectedProps {
  authorized: boolean;
}

export interface IProtectedActions {
  onUnauthorizedAccess: () => void;
}

export class Protected extends React.PureComponent<IProtectedProps & IProtectedActions> {

  componentDidMount() {
    this.checkAuthorization();
  }

  componentDidUpdate() {
    this.checkAuthorization();
  }

  checkAuthorization = () => {
    if (!this.props.authorized) {
      this.props.onUnauthorizedAccess();
    }
  };

  render(): JSX.Element {
    if (this.props.authorized) {
      return (<>{this.props.children}</>);
    } else {
      return (<div>Access denied</div>);
    }
  }
}
