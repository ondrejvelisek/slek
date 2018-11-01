import { connect } from 'react-redux';
import {IRootState} from '../../states/IRootState';
import {IHasId} from '../../models/chat/IHasId';
import {Channel, IChannelActions, IChannelProps} from '../../components/chat/Channel';
import {selectChannel} from '../../actions/chat/Channels';

interface IChannelOwnProps extends IHasId {}

const mapStateToProps = (state: IRootState, ownProps: IChannelOwnProps): IChannelProps => ({
  ...state.chat.channels.content.get(ownProps.id),
  active: state.chat.channels.active === ownProps.id
});

const mapDispatchToProps: IChannelActions = {
  selectChannel
};

export const ChannelContainer = connect(mapStateToProps, mapDispatchToProps)(Channel);
