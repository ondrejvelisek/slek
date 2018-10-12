import React from 'react';
import '../less/Message.less';

export default class Message extends React.PureComponent {
  render() {
    const { text, mine } = this.props;
    return (
      <p className={`message ${mine ? 'mine' : ''}`}>
        <span>
          {text}
        </span>
      </p>
    );
  }
}
