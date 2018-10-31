import * as React from 'react';
import '../../less/chat/Avatar.less';
import {IAvatar} from '../../models/chat/IAvatar';

export class Avatar extends React.PureComponent<IAvatar> {
  render(): JSX.Element {
    const { image, className } = this.props;
    return (
      <div className={`avatar ${className}`}>
        <img src={image} alt="avatar"/>
      </div>
    );
  }
}
