import * as React from 'react';
import '../../less/chat/Avatar.less';
import {IAccount} from '../../models/chat/IAccount';

export interface IAvatarProps {
  account: IAccount|null;
  className: string;
}

export class Avatar extends React.PureComponent<IAvatarProps> {
  render(): JSX.Element {
    const { account, className } = this.props;
    if (!account) {
      return (
        <div className={`avatar ${className}`}>
          <img src="unknown-url.jpg" alt="avatar"/>
        </div>
      );
    } else {
      return (
        <div className={`avatar ${className}`}>
          <img src={account.avatar ? account.avatar : 'default-url'} alt="avatar"/>
        </div>
      );
    }
  }
}
