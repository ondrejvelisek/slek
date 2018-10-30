import * as React from 'react';
import '../../less/chat/Message.less';

export class Message extends React.PureComponent<MessageType > {
  render(): JSX.Element {
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
