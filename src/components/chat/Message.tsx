import * as React from 'react';
import '../../less/chat/Message.less';
import {IMessage} from '../../models/chat/IMessage';

export class Message extends React.PureComponent<IMessage > {
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
