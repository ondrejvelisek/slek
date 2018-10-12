import React from 'react';
import '../less/Avatar.less';

export default class Avatar extends React.PureComponent {
  render() {
    const { image, className } = this.props;
    return (
      <div className={`avatar ${className}`}>
        <img src={image} alt="avatar"/>
      </div>
    );
  }
}
