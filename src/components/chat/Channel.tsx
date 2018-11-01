import * as React from 'react';
import {
  ListGroupItem, Badge
} from 'reactstrap';
import '../../less/chat/Channels.less';
import {IChannel} from '../../models/chat/IChannel';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';

export interface IChannelProps extends ILoadable<IChannel> {
  active: boolean;
}

export interface IChannelActions {
  selectChannel: (channelId: Uuid) => void;
}

export class Channel extends React.PureComponent<IChannelProps & IChannelActions> {

  selectChannel = () => {
    this.props.selectChannel(this.props.content.id);
  };

  render(): JSX.Element {
    const { content: channel, active, isLoading } = this.props;
    return (
      <ListGroupItem className={`clickable ' ${active ? 'selected' : ''}`} onClick={this.selectChannel}>
        <span>
          {channel.name}
        </span>
        {channel.unread && (<Badge pill>{channel.unread}</Badge>)}
        {isLoading && (<Loader/>)}
      </ListGroupItem>
    );
  }
}
