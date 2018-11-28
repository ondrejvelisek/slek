import * as React from 'react';
import '../../less/chat/Message.less';
import {Media} from 'reactstrap';
import {IMessage} from '../../models/chat/IMessage';
import {AvatarContainer} from '../../containers/chat/Avatar';
// import {AvatarContainer} from '../../containers/chat/Avatar';

export interface IMessageProps extends IMessage {
  mine?: boolean;
}

export class Message extends React.PureComponent<IMessageProps> {

  componentDidMount() {
    console.log('One Message did mount');
  }


  render(): JSX.Element {
    const { text, mine, accountEmail } = this.props;
    return (
      <Media tag="li" className={mine ? 'text-right' : ''}>
        {!mine && (<AvatarContainer className="avatar align-self-end" email={accountEmail}/>)}
        <Media body>
          <p className={`message ${mine ? 'mine' : ''}`}>
            <span>
              {text}
            </span>
          </p>
        </Media>
      </Media>
    );
  }
}
