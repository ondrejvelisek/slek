import * as React from 'react';
import {
  ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/Channels.less';
import { IChannels } from '../models/IChat';
import * as Immutable from 'immutable';
import * as _ from 'lodash';

export interface IChannelsStateProps {
  readonly channels: IChannels;
}

export interface IChannelsDispatchProps {
  readonly addChannel: (name: string, messages: number, accountIds: Immutable.List<number>) => void;
}

export class Channels extends React.PureComponent<IChannelsStateProps & IChannelsDispatchProps> {

  addChannel = () => {
    this.props.addChannel(`Random #${Math.floor(Math.random() * 100)}`, Math.floor(Math.random() * 100), Immutable.List<number>());
  };

  render(): JSX.Element {
    if (this.props.channels.isLoading) {
      return (
        <div className="channels text-light">
              {/*<ScaleLoader/>*/}
        </div>
      );
    }
    const { channels } = this.props;
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>
          {
            _.map(channels.content, (channel: ChannelType) => (
              <ListGroupItem key={channel.id} className={`clickable ${Number(channel.id) === channels.active ? 'selected' : ''}`}>
                <span>
                  {channel.name}
                </span>
                {channel.messages > 0 && (
                  <Badge pill>{channel.messages}</Badge>
                )}
              </ListGroupItem>
            ))
            // channels.content.map((channel: ChannelType) => (
            //   <ListGroupItem key={channel.id} className={`clickable ${Number(channel.id) === channels.active ? 'selected' : ''}`}>
            //     <span>
            //       {channel.name}
            //     </span>
            //     {channel.messages > 0 && (
            //       <Badge pill>{channel.messages}</Badge>
            //     )}
            //   </ListGroupItem>
            // ))
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
