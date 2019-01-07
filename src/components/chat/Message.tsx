import * as React from 'react';
import {stateToHTML} from 'draft-js-export-html';
import '../../less/chat/Message.less';
import {Button, Media} from 'reactstrap';
import {IMessage} from '../../models/chat/IMessage';
import {AvatarContainer} from '../../containers/chat/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsDown, faThumbsUp, faTrashAlt, faFile} from '@fortawesome/free-solid-svg-icons';
import {MessageType} from '../../models/chat/IMessageData';
import {convertFromRaw} from 'draft-js';

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

  renderMessage = (): JSX.Element => {
    const { type, value, title } = this.props;
    if (type === MessageType.Image) {
      return <img src={value} className="image img-fluid"/>;
    } else if (type === MessageType.File) {
      return (
        <a href={value} className="file">
          <FontAwesomeIcon icon={faFile}/>
          {title}
        </a>
      );
    } else {
      const rawMessage = stateToHTML(convertFromRaw(JSON.parse(value)));
      return <span className="text" dangerouslySetInnerHTML={{__html: rawMessage}}/>;
    }
  };

  renderVotes = (): JSX.Element => {
    const { votes } = this.props;
    return <span className="votes">{votes ? `${votes > 0 ? '+' : ''}${votes}` : ''}</span>;
  };

  renderTools = (): JSX.Element => {
    return (
      <span className="tools">
        <span className="list">
          <span className="item">
            <Button onClick={this.voteUp}>
              <FontAwesomeIcon icon={faThumbsUp}/>
            </Button>
          </span>
          <span className="item">
            <Button onClick={this.delete}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </Button>
          </span>
          <span className="item">
            <Button onClick={this.voteDown}>
              <FontAwesomeIcon icon={faThumbsDown}/>
            </Button>
          </span>
        </span>
      </span>
    );
  };

  render(): JSX.Element {
    const { mine, createdBy } = this.props;
    return (
      <Media tag="li" className={mine ? 'text-right' : ''}>
        {!mine && (<AvatarContainer className="avatar align-self-end" email={createdBy}/>)}
        <Media body>
          <p className={`message ${mine ? 'mine' : ''}`}>
            <span className="body">

              {mine && this.renderTools()}
              {mine && this.renderVotes()}

              {this.renderMessage()}

              {!mine && this.renderVotes()}
              {!mine && this.renderTools()}

            </span>
          </p>
        </Media>
      </Media>
    );
  }
}
