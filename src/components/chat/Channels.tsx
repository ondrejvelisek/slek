import * as React from 'react';
import {
  ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/Channels.less';
import * as Immutable from 'immutable';
import * as _ from 'lodash';
import {IChannel} from '../../models/chat/IChannel';
import {IChannelsListState} from '../../states/chat/IChat';

export interface IChannelsDispatchProps {
  readonly addChannel: (name: string, messages: number, accountIds: Immutable.List<Uuid>) => void;
}

export class Channels extends React.PureComponent<IChannelsListState & IChannelsDispatchProps> {

  addChannel = () => {
    this.props.addChannel(`Random #${Math.floor(Math.random() * 100)}`, Math.floor(Math.random() * 100), Immutable.List<Uuid>());
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
    _.map(channels.content, (channel: IChannel) => {
      console.log(channel);
    });
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>
          {
            // _.map(channels.content, ( channel: IChannel, id: Uuid ) => (
            //   <ListGroupItem key={id} className={`clickable ${Number(channel.id) === this.props.active ? 'selected' : ''}`}>
            //     <span>
            //       {channel.name}
            //     </span>
            //     {channel.messages > 0 && (
            //       <Badge pill>{channel.messages}</Badge>
            //     )}
            //   </ListGroupItem>
            // ))
            channels.content.map((channel: IChannel, id: Uuid) => (
              <ListGroupItem key={id} className={`clickable ' ${Number(channel.id) === this.props.active ? 'selected' : ''}`}>
                <span>
                  {channel.name}
                </span>
                {channel.messages > 0 && (
                  <Badge pill>{channel.messages}</Badge>
                )}
              </ListGroupItem>
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
