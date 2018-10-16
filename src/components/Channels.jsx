import React from 'react';
import {
  ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../less/Channels.less';
import * as _ from 'lodash';

export default class Channels extends React.PureComponent {

  addChannel = () => {
    const { addChannel } = this.props;
    addChannel(`Random #${Math.floor(Math.random() * 100)}`, Math.floor(Math.random() * 100), []);
  };

  render() {
    const { channels } = this.props;
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>
          {
            _.map(channels.content, (channel, id) => (
              <ListGroupItem key={id} className={`clickable ${Number(id) === channels.active ? 'selected' : ''}`}>
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
