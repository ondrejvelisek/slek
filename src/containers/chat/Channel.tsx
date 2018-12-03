import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IHasId} from '../../models/chat/IHasId';
import {Channel, IChannelActions, IChannelProps} from '../../components/chat/Channel';
import {selectChannel} from '../../actions/chat/Channels';
import {selectActiveAccountEmail, selectActiveChannelId, selectChannelsMap} from '../../selectors/chat';

interface IChannelOwnProps extends IHasId {}

const mapStateToProps = (state: IRootState, ownProps: IChannelOwnProps): IChannelProps => ({
  ...selectChannelsMap(state).get(ownProps.id),
  active: selectActiveChannelId(state) === ownProps.id,
  email: selectActiveAccountEmail(state)
});

const mapDispatchToProps: IChannelActions = {
  selectChannel
};

export const ChannelContainer = connect(mapStateToProps, mapDispatchToProps)(Channel);
