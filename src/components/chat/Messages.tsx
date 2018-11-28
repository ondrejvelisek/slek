import * as React from 'react';
import { Media } from 'reactstrap';
import '../../less/chat/Messages.less';
import {ILoadable} from '../../states/common/ILoadable';
import {MessageContainer} from '../../containers/chat/Message';
import * as Immutable from 'immutable';
import {Loader} from './Loader';
import Timeout = NodeJS.Timeout;

export interface IMessagesProps extends ILoadable<Immutable.List<Uuid>|null> {}

export interface IMessagesActions {
  onMessagesTrigger: () => void;
  onMounted: () => void;
}

export class Messages extends React.PureComponent<IMessagesProps & IMessagesActions> {
  private timer: Timeout;
  private bottomElement: React.RefObject<HTMLDivElement>;
  constructor(props: IMessagesProps & IMessagesActions) {
    super(props);
    this.bottomElement = React.createRef();
  }

  scrollToBottom() {
    if (this.bottomElement.current) {
      this.bottomElement.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  componentDidMount() {
    this.props.onMounted();
    this.timer = setInterval(() => this.props.onMessagesTrigger(), 5000);
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render(): JSX.Element {
    if (!this.props.content || this.props.content.isEmpty()) {
      if (this.props.isLoading) {
        return (<Media list className="messages"><Loader/></Media>);
      } else {
        return (<Media list className="messages empty">No messages here, relax</Media>);
      }
    }
    return (
      <Media list className="messages">
        {
          this.props.content.map((messageId: Uuid) => (
            <MessageContainer key={messageId} id={messageId}/>
          ))
        }
        <div ref={this.bottomElement}/>
      </Media>
    );
  }
}
