import * as React from 'react';
import '../../less/chat/Message.less';
import {Media} from 'reactstrap';
import {IMessage} from '../../models/chat/IMessage';
import {AvatarContainer} from '../../containers/chat/Avatar';

export interface IMessageProps extends IMessage {
  mine?: boolean;
}

export class Message extends React.PureComponent<IMessageProps> {

  render(): JSX.Element {
    const { value, mine, createdBy } = this.props;
    return (
      <Media tag="li" className={mine ? 'text-right' : ''}>
        {!mine && (<AvatarContainer className="avatar align-self-end" email={createdBy}/>)}
        <Media body>
          <p className={`message ${mine ? 'mine' : ''}`}>
            <span>
              {value}
            </span>
          </p>
        </Media>
      </Media>
    );
  }
}
