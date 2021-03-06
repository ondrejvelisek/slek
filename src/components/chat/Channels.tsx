import * as React from 'react';
import {
  Button,
  ListGroup, ListGroupItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends, faExclamationCircle, faSort
} from '@fortawesome/free-solid-svg-icons';
import '../../less/chat/Channels.less';
import * as Immutable from 'immutable';
import {ChannelContainer} from '../../containers/chat/Channel';
import {ILoadable} from '../../states/common/ILoadable';
import {Loader} from './Loader';
import {NewChannelContainer} from '../../containers/chat/NewChannel';
import {IActiveAccountOwnProps} from '../../containers/chat/ActiveAccount';

export interface IChannelsProps extends ILoadable<Immutable.List<Uuid>>, IActiveAccountOwnProps {}

export interface IChannelsActions {
  readonly onMounted: () => void;
  readonly onReloadChannels: () => void;
  readonly onReorder: () => void;
}

export class Channels extends React.PureComponent<IChannelsProps & IChannelsActions> {
  componentDidMount() {
    this.props.onMounted();
  }

  reorder = () => {
    this.props.onReorder();
  };

  renderList = () => {
    const { content: channelIds, error, isLoading } = this.props;
    if (error) {
      return (
        <ListGroupItem className="clickable" onClick={this.props.onReloadChannels}>
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
            <Button size="sm" className="fa-pull-right" onClick={this.reorder}><FontAwesomeIcon icon={faSort}/></Button>
          </ListGroupItem>
          {this.renderList()}
          <NewChannelContainer/>
        </ListGroup>

      </div>
    );
  }
}
