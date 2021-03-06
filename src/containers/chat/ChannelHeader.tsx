import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {selectActiveChannel} from '../../selectors/chat';
import {ChannelHeader, IChannelHeaderActions, IChannelHeaderProps} from '../../components/chat/ChannelHeader';
import {
  cancelEditingChannel,
  deleteChannel,
  startEditingChannel,
  updateChannel
} from '../../actions/chat/Channels';

const mapStateToProps = (state: IRootState): IChannelHeaderProps =>
  selectActiveChannel(state);

const mapDispatchToProps: IChannelHeaderActions = {
  deleteChannel,
  updateChannel,
  startEditingChannel,
  cancelEditingChannel,
};

export const ChannelHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelHeader);
