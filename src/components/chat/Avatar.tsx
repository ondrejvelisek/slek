import * as React from 'react';
import '../../less/chat/Avatar.less';

export class Avatar extends React.PureComponent<AvatarType> {
  render(): JSX.Element {
    const { image, className } = this.props;
    return (
      <div className={`avatar ${className}`}>
        <img src={image} alt="avatar"/>
      </div>
    );
  }
}
