import React from 'react';
import {
  ListGroup, ListGroupItem, Badge
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../less/Channels.less';

export default class Channels extends React.PureComponent {
  render() {
    return (

      <div className="channels text-light">

        <ListGroup flush>
          <ListGroupItem className="header">
            <FontAwesomeIcon icon={faUserFriends}/>
            <span> Channels</span>
          </ListGroupItem>

          <ListGroupItem className="clickable">
            <span>Developers </span>
            <Badge pill>2</Badge>
          </ListGroupItem>
          <ListGroupItem className="clickable">
            <span>Sales & Marketing </span>
          </ListGroupItem>
          <ListGroupItem className="clickable">
            <span>User Support </span>
            <Badge pill>11</Badge>
          </ListGroupItem>
          <ListGroupItem className="clickable">
            <FontAwesomeIcon icon={faPlus}/>
            <span> Add</span>
          </ListGroupItem>

        </ListGroup>

      </div>
    );
  }
}
