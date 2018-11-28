import * as React from 'react';
import { Media } from 'reactstrap';
import '../../less/chat/Messages.less';
import {ILoadable} from '../../states/common/ILoadable';
import {MessageContainer} from '../../containers/chat/Message';
import * as Immutable from 'immutable';
import {Loader} from './Loader';

export interface IMessagesOwnState {
  timer: any;
}

export interface IMessagesProps extends ILoadable<Immutable.List<Uuid>> {}

export interface IMessagesActions {
  onMessagesTrigger: () => void
}

export class Messages extends React.PureComponent<IMessagesProps & IMessagesActions, IMessagesOwnState> {
  constructor(props: IMessagesProps & IMessagesActions) {
    super(props);

    this.state = {
      timer: null
    };
  }

  componentDidMount() {
    const timer = setInterval(() => this.props.onMessagesTrigger(), 5000);
    this.setState(prevState => ({...prevState, timer}));
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render(): JSX.Element {
    if (this.props.content.isEmpty()) {
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
      </Media>
    );
  }
}
