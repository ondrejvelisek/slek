import * as React from 'react';
import '../../less/chat/Avatar.less';
import {IAccount} from '../../models/chat/IAccount';

export interface IAvatarProps extends IAccount {
  className: string;
}

export class Avatar extends React.PureComponent<IAvatarProps> {
  render(): JSX.Element {
    const { avatar, className } = this.props;
    return (
      <div className={`avatar ${className}`}>
        <img src={avatar ? avatar : 'default-url'} alt="avatar"/>
      </div>
    );
  }
}
