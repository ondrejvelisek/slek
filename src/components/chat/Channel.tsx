import * as React from 'react';
import {
  ListGroupItem, Badge
} from 'reactstrap';
import '../../less/chat/Channels.less';
import {IChannel} from '../../models/chat/IChannel';

export interface IChannelProps extends IChannel {
  active: boolean;
}

export interface IChannelActions {}

export class Channel extends React.PureComponent<IChannelProps & IChannelActions> {
  render(): JSX.Element {
    const { name, unread, active } = this.props;
    return (
      <ListGroupItem className={`clickable ' ${active ? 'selected' : ''}`}>
        <span>
          {name}
        </span>
        {unread > 0 && (<Badge pill>{unread}</Badge>)}
      </ListGroupItem>
    );
  }
}
