import * as React from 'react';
import { Media } from 'reactstrap';
import '../../less/chat/Messages.less';
import {ILoadable} from '../../states/common/ILoadable';
import {MessageContainer} from '../../containers/chat/Message';
import * as Immutable from 'immutable';

export interface IMessagesProps extends ILoadable<Immutable.List<Uuid>> {}

export interface IMessagesActions {}

export class Messages extends React.PureComponent<IMessagesProps & IMessagesActions> {
  render(): JSX.Element {
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
