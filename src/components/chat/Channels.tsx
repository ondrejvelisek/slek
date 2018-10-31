import * as React from 'react';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/Channels.less';
import * as Immutable from 'immutable';
import {ChannelContainer} from '../../containers/chat/Channel';
import {ILoadable} from '../../states/common/ILoadable';
import {IChannel} from '../../models/chat/IChannel';

export interface IChannelsProps extends ILoadable<Immutable.List<Uuid>> {}

export interface IChannelsActions {
  readonly addChannel: (channel: IChannel) => void;
}

export class Channels extends React.PureComponent<IChannelsProps & IChannelsActions> {

  addChannel = () => {
    this.props.addChannel({name: 'New one', unread: 666, accountIds: Immutable.Set<Uuid>()});
  };

  render(): JSX.Element {
    const { content: channelIds, error, isLoading } = this.props;
    if (isLoading) {
      return (
        <div className="channels text-light">
          Loading
        </div>
      );
    }
    if (error) {
      return (
        <div className="channels text-light">
          Error
        </div>
      );
    }
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>
          {
            channelIds.map((channelId: Uuid) => (
              <ChannelContainer key={channelId} id={channelId}/>
            ))
          }
          <ListGroupItem className="clickable" onClick={this.addChannel}>
            <FontAwesomeIcon icon={faPlus}/>
            <span> Add</span>
          </ListGroupItem>

        </ListGroup>

      </div>
    );
  }
}
