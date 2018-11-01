import {IRootState} from '../../states/IRootState';
import {connect} from 'react-redux';
import {selectActiveChannel} from '../../selectors/chat';
import {ChannelHeader, IChannelHeaderActions, IChannelHeaderProps} from '../../components/chat/ChannelHeader';
import {removeChannel} from '../../actions/chat/Channels';

const mapStateToProps = (state: IRootState): IChannelHeaderProps =>
  selectActiveChannel(state);

const mapDispatchToProps: IChannelHeaderActions = {
  removeChannel
};

export const ChannelHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(ChannelHeader);
