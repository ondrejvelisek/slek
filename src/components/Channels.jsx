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
import state from './state';

export default class Channels extends React.PureComponent {
  render() {
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>
          {
            _.map(state.channels.content, (channel, id) => (
              <ListGroupItem key={id} className={`clickable ${channel.active ? 'selected' : ''}`}>
                <span>
                  {channel.name}
                </span>
                {channel.messages > 0 && (
                  <Badge pill>{channel.messages}</Badge>
                )}
              </ListGroupItem>
            ))
          }
          <ListGroupItem className="clickable">
            <FontAwesomeIcon icon={faPlus}/>
            <span> Add</span>
          </ListGroupItem>

        </ListGroup>

      </div>
    );
  }
}
