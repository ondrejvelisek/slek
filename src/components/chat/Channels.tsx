import * as React from 'react';
import {
  ListGroup, ListGroupItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faUserFriends, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/Channels.less';
import * as Immutable from 'immutable';
import {ChannelContainer} from '../../containers/chat/Channel';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {IChannelData} from '../../models/chat/IChannelData';

export interface IChannelsProps extends ILoadable<Immutable.List<Uuid>> {
  readonly token: string;
}

export interface IChannelsActions {
  readonly channelsMounted: (token: string) => void;
  readonly addChannel: (channel: IChannelData, token: string) => void;
}

export class Channels extends React.PureComponent<IChannelsProps & IChannelsActions> {

  componentDidMount() {
    this.reloadChannels();
  }

  reloadChannels = () => {
    this.props.channelsMounted(this.props.token);
  };

  addChannel = () => {
    this.props.addChannel({name: `New #${randId()}`, unread: 666, accountIds: Immutable.Set<Uuid>()}, this.props.token);

    function randId() {
      return `${Math.floor(Math.random() * 1000)}`;
    }
  };

  renderList = () => {
    const { content: channelIds, error, isLoading } = this.props;
    if (error) {
      return (
        <ListGroupItem className="clickable" onClick={this.reloadChannels}>
          <FontAwesomeIcon icon={faExclamationCircle}/>
          <span> Error - Try again</span>
        </ListGroupItem>
      );
    }
    return (
      <div>
        {channelIds.map((channelId: Uuid) => (
          <ChannelContainer key={channelId} id={channelId}/>
        ))}
        {isLoading && (<Loader/>)}
      </div>
    );
  };

  render(): JSX.Element {
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>
          {this.renderList()}
          <ListGroupItem className="clickable" onClick={this.addChannel}>
            <FontAwesomeIcon icon={faPlus}/>
            <span> Add</span>
          </ListGroupItem>

        </ListGroup>

      </div>
    );
  }
}
