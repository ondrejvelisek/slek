import * as React from 'react';
import '../../less/chat/Message.less';
import {Button, Media} from 'reactstrap';
import {IMessage} from '../../models/chat/IMessage';
import {AvatarContainer} from '../../containers/chat/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp, faThumbsDown, faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

export interface IMessageProps extends IMessage {
  mine?: boolean;
}

export interface IMessageActions {
  onVoteUp: (messageId: Uuid) => void;
  onVoteDown: (messageId: Uuid) => void;
  onDelete: (messageId: Uuid) => void;
}

export class Message extends React.PureComponent<IMessageProps & IMessageActions> {

  voteUp = () => {
    this.props.onVoteUp(this.props.id);
  };

  voteDown = () => {
    this.props.onVoteDown(this.props.id);
  };

  delete = () => {
    this.props.onDelete(this.props.id);
  };

  render(): JSX.Element {
    const { value, mine, createdBy, votes } = this.props;
    return (
      <Media tag="li" className={mine ? 'text-right' : ''}>
        {!mine && (<AvatarContainer className="avatar align-self-end" email={createdBy}/>)}
        <Media body>
          <p className={`message ${mine ? 'mine' : ''}`}>
            <div className="tools">
              <ul className="tools-list">
                <li>
                  <Button onClick={this.voteUp}>
                    <FontAwesomeIcon icon={faThumbsUp}/>
                  </Button>
                </li>
                <li>
                  <Button onClick={this.delete}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                  </Button>
                </li>
                <li>
                  <Button onClick={this.voteDown}>
                    <FontAwesomeIcon icon={faThumbsDown}/>
                  </Button>
                </li>
              </ul>
            </div>
            <span className="votes">
              {votes ? `${votes > 0 ? '+' : ''}${votes}` : ''}
            </span>
            <span className="text">
              {value}
            </span>
          </p>
        </Media>
      </Media>
    );
  }
}
